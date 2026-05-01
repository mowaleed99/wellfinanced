/**
 * FinanceContext.tsx
 *
 * Refactored to:
 * - Fetch ALL data from the API layer (no localStorage)
 * - Store normalized Record types (InflowRecord / OutflowRecord / TransferRecord)
 * - Expose a backward-compatible `transactions` array (LegacyTransaction[])
 *   so Dashboard, FinancialEntry, and other pages compile unchanged
 * - Include loading + error states
 * - Wire Notifications to real data model
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import type { Record as FinRecord, InflowRecord, OutflowRecord, Plan, LegacyTransaction } from '../types/records';
import { recordToLegacy, mapLegacyTransaction } from '../types/records';

import type { LinkedAccount } from '../types/account';
import type { Notification } from '../types/notification';
import type { Asset } from '../types/asset';
import type { Counterparty } from '../types/counterparty';
import type { Installment, Schedule, Reminder } from '../types/schedule';

import {
  calculateBalance,
  getMonthlyStats,
  calculateStableSalary,
  generateInsights,
} from '../utils/finance';

import {
  accountsApi,
  recordsApi,
  notificationsApi,
  assetsApi,
  installmentsApi,
  plansApi,
  counterpartiesApi,
} from '../services/api';

// ---------------------------------------------------------------------------
// Public alias kept for pages that import Goal from context
// ---------------------------------------------------------------------------
export type Goal = Plan;

export type SavingsAccount = { id: string; name: string; balance: number };
export type Savings = { total: number; accounts: SavingsAccount[] };

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

type FinanceState = {
  /** Normalized records — internal, backend-aligned */
  records: FinRecord[];
  /** Backward-compat flattened transactions for legacy page consumers */
  transactions: LegacyTransaction[];
  counterparties: Counterparty[];
  goals: Goal[];
  savings: Savings;
  linkedAccounts: LinkedAccount[];
  notifications: Notification[];
  assets: Asset[];
  installments: Installment[];
  balance: number;
  incomeThisMonth: number;
  expensesThisMonth: number;
  stableSalary: number;
  insights: string[];
  isLoading: boolean;
  error: string | null;
};

type FinanceContextType = FinanceState & {
  /** Add a new record via API. Accepts the old Transaction shape for compat. */
  addTransaction: (transaction: Omit<LegacyTransaction, 'id'>) => Promise<void>;
  /** Add a new record using the full backend model shape */
  addRecord: (record: Omit<FinRecord, 'id'>) => Promise<void>;
  addInstallment: (installment: Omit<Installment, 'id'>) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id'>) => Promise<void>;
  updateGoal: (id: string, currentAmount: number) => Promise<void>;
  updateSavings: (accountId: string, amount: number) => void;
  triggerSync: (accountId: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  refetch: () => Promise<void>;
};

// ---------------------------------------------------------------------------
// Context creation
// ---------------------------------------------------------------------------

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  // Core normalized state
  const [records, setRecords] = useState<FinRecord[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [counterparties, setCounterparties] = useState<Counterparty[]>([]);
  const [savings, setSavings] = useState<Savings>({ total: 0, accounts: [] });

  // Loading / error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Initial data fetch — replaces all localStorage reads
  // ---------------------------------------------------------------------------

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [
        fetchedAccounts,
        fetchedRecords,
        fetchedPlans,
        fetchedNotifications,
        fetchedAssets,
        fetchedInstallments,
        fetchedCounterparties,
      ] = await Promise.all([
        accountsApi.getAccounts(),
        recordsApi.getRecords(),
        plansApi.getPlans(),
        notificationsApi.getNotifications(),
        assetsApi.getAssets(),
        installmentsApi.getInstallments(),
        counterpartiesApi.getCounterparties(),
      ]);

      setLinkedAccounts(fetchedAccounts);
      setRecords(fetchedRecords);
      setGoals(fetchedPlans);
      setNotifications(fetchedNotifications);
      setAssets(fetchedAssets);
      setInstallments(fetchedInstallments);
      setCounterparties(fetchedCounterparties);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ---------------------------------------------------------------------------
  // Derived / computed values
  // ---------------------------------------------------------------------------

  const balance = calculateBalance(records);
  const { income: incomeThisMonth, expenses: expensesThisMonth } = getMonthlyStats(records);
  const stableSalary = calculateStableSalary(records);
  const insights = generateInsights(records, goals, linkedAccounts);

  /** Backward-compat: flatten records → LegacyTransaction[] for UI consumers */
  const transactions: LegacyTransaction[] = records.map(recordToLegacy);

  // ---------------------------------------------------------------------------
  // Mutations
  // ---------------------------------------------------------------------------

  const addTransaction = async (t: Omit<LegacyTransaction, 'id'>) => {
    const legacyWithId: LegacyTransaction = { ...t, id: crypto.randomUUID() };
    const newRecord = mapLegacyTransaction(legacyWithId);

    // Optimistic update
    setRecords(prev =>
      [newRecord, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );

    try {
      await recordsApi.createRecord(newRecord as Omit<InflowRecord | OutflowRecord, 'id'>);
    } catch {
      // Rollback on failure
      setRecords(prev => prev.filter(r => r.id !== newRecord.id));
    }
  };

  const addRecord = async (r: Omit<FinRecord, 'id'>) => {
    const newRecord: FinRecord = { ...r, id: crypto.randomUUID() } as FinRecord;
    
    // Optimistic update
    setRecords(prev =>
      [newRecord, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );

    try {
      await recordsApi.createRecord(newRecord as Omit<InflowRecord | OutflowRecord, 'id'>);
    } catch {
      // Rollback on failure
      setRecords(prev => prev.filter(rec => rec.id !== newRecord.id));
    }
  };

  const addInstallment = async (inst: Omit<Installment, 'id'>) => {
    try {
      if (!inst.schedule_id) {
        throw new Error('schedule_id is required but Schedules API is currently missing.');
      }
      const newInst = await installmentsApi.createInstallment(inst);
      setInstallments(prev => [...prev, newInst]);
    } catch (err) {
      console.error('[addInstallment Failed]', err);
      throw err;
    }
  };

  const removeTransaction = async (id: string) => {
    const previous = records;
    setRecords(prev => prev.filter(r => r.id !== id));
    try {
      await recordsApi.deleteRecord(id);
    } catch {
      setRecords(previous);
    }
  };

  const addGoal = async (g: Omit<Goal, 'id'>) => {
    const newGoal = await plansApi.createPlan(g);
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = async (id: string, currentAmount: number) => {
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, currentAmount } : g)));
    await plansApi.updatePlan(id, currentAmount);
  };

  const updateSavings = (accountId: string, amount: number) => {
    setSavings(prev => {
      const newAccounts = prev.accounts.map(a =>
        a.id === accountId ? { ...a, balance: a.balance + amount } : a
      );
      return { total: newAccounts.reduce((acc, a) => acc + a.balance, 0), accounts: newAccounts };
    });
  };

  const triggerSync = async (accountId: string) => {
    const { account: updated, newRecords } = await accountsApi.syncAccount(accountId);
    setLinkedAccounts(prev => prev.map(a => (a.id === accountId ? updated : a)));
    setRecords(prev =>
      [...newRecords, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  };

  const markAllNotificationsRead = async () => {
    await notificationsApi.markAllRead();
    setNotifications(prev => prev.map(n => ({ ...n, status: 'viewed' as const })));
  };

  const refetch = fetchAll;

  // ---------------------------------------------------------------------------
// Provider value
// ---------------------------------------------------------------------------

  return (
    <FinanceContext.Provider
      value={{
        // Normalized (new)
        records,
        notifications,
        assets,
        installments,
        // Backward-compat (old shape — UI pages unchanged)
        transactions,
        goals,
        savings,
        linkedAccounts,
        counterparties,
        // Derived
        balance,
        incomeThisMonth,
        expensesThisMonth,
        stableSalary,
        insights,
        // Status
        isLoading,
        error,
        // Actions
        addTransaction,
        addRecord,
        addInstallment,
        removeTransaction,
        addGoal,
        updateGoal,
        updateSavings,
        triggerSync,
        markAllNotificationsRead,
        refetch,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
