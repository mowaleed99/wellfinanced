import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Transaction, 
  LinkedAccount,
  Plan,
  calculateBalance, 
  getMonthlyStats, 
  calculateStableSalary, 
  generateInsights, 
  syncLinkedAccount
} from '../utils/finance';

export type Goal = Plan; // Alias since we refactored

export type SavingsAccount = {
  id: string;
  name: string;
  balance: number;
};

export type Savings = {
  total: number;
  accounts: SavingsAccount[];
};

type FinanceState = {
  transactions: Transaction[];
  goals: Goal[];
  savings: Savings;
  linkedAccounts: LinkedAccount[];
  balance: number;
  incomeThisMonth: number;
  expensesThisMonth: number;
  stableSalary: number;
  insights: string[];
};

type FinanceContextType = FinanceState & {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, currentAmount: number) => void;
  updateSavings: (accountId: string, amount: number) => void;
  triggerSync: (accountId: string) => Promise<void>;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const defaultTransactions: Transaction[] = [
  { id: crypto.randomUUID(), title: 'Client Alpha - Website', date: new Date().toISOString().split('T')[0], amount: 2400, type: 'income', category: 'freelance', status: 'received' },
  { id: crypto.randomUUID(), title: 'Adobe Creative Cloud', date: new Date(Date.now() - 3*86400000).toISOString().split('T')[0], amount: -54.99, type: 'expense', category: 'software', recurrence: 'monthly' },
  { id: crypto.randomUUID(), title: 'AWS Hosting', date: new Date(Date.now() - 5*86400000).toISOString().split('T')[0], amount: -12.50, type: 'expense', category: 'software', recurrence: 'monthly' },
  { id: crypto.randomUUID(), title: 'Groceries', date: new Date(Date.now() - 1*86400000).toISOString().split('T')[0], amount: -120.00, type: 'expense', category: 'food' },
];

const defaultLinkedAccounts: LinkedAccount[] = [
  { id: 'acc1', name: 'Chase Bank', provider: 'bank', balance: 4250.00, lastSynced: new Date().toISOString() },
  { id: 'acc2', name: 'Vodafone Cash', provider: 'vodafone_cash', balance: 1100.00, lastSynced: new Date(Date.now() - 8*86400000).toISOString() }
];

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('wf_transactions');
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('wf_goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [savings, setSavings] = useState<Savings>(() => {
    const saved = localStorage.getItem('wf_savings');
    return saved ? JSON.parse(saved) : { total: 0, accounts: [] };
  });

  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>(() => {
    const saved = localStorage.getItem('wf_linked_accounts');
    return saved ? JSON.parse(saved) : defaultLinkedAccounts;
  });

  useEffect(() => {
    localStorage.setItem('wf_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('wf_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('wf_savings', JSON.stringify(savings));
  }, [savings]);

  useEffect(() => {
    localStorage.setItem('wf_linked_accounts', JSON.stringify(linkedAccounts));
  }, [linkedAccounts]);

  // Derived state using utilities
  const balance = calculateBalance(transactions);
  const monthlyStats = getMonthlyStats(transactions);
  const stableSalary = calculateStableSalary(transactions);
  const insights = generateInsights(transactions, goals, linkedAccounts);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...t,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTx, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addGoal = (g: Omit<Goal, 'id'>) => {
    setGoals(prev => [...prev, { ...g, id: crypto.randomUUID() }]);
  };

  const updateGoal = (id: string, currentAmount: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, currentAmount } : g));
  };

  const updateSavings = (accountId: string, amount: number) => {
    setSavings(prev => {
      const newAccounts = prev.accounts.map(a => a.id === accountId ? { ...a, balance: a.balance + amount } : a);
      const newTotal = newAccounts.reduce((acc, a) => acc + a.balance, 0);
      return { total: newTotal, accounts: newAccounts };
    });
  };

  const triggerSync = async (accountId: string) => {
    const account = linkedAccounts.find(a => a.id === accountId);
    if (!account) return;

    const { newBalance, newTransactions } = await syncLinkedAccount(account);
    
    setLinkedAccounts(prev => prev.map(a => a.id === accountId ? { ...a, balance: newBalance, lastSynced: new Date().toISOString() } : a));
    
    setTransactions(prev => {
      const updated = [...newTransactions, ...prev];
      return updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        goals,
        savings,
        linkedAccounts,
        balance,
        incomeThisMonth: monthlyStats.income,
        expensesThisMonth: monthlyStats.expenses,
        stableSalary,
        insights,
        addTransaction,
        removeTransaction,
        addGoal,
        updateGoal,
        updateSavings,
        triggerSync
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
