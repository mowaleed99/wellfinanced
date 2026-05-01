/**
 * finance.ts — Finance Utility Functions
 *
 * Updated to operate on the new Record union types (InflowRecord / OutflowRecord / TransferRecord).
 * All old exports that the UI pages reference are preserved for backward compatibility.
 */

import type {
  Record as FinRecord,
  InflowRecord,
  OutflowRecord,
  Plan,
  TimelineEvent,
  LegacyTransaction,
  FinancialFlowCategory,
} from '../types/records';

import type { LinkedAccount } from '../types/account';

// ---------------------------------------------------------------------------
// Re-export types pages import from here (backward compat)
// ---------------------------------------------------------------------------

export type { Plan, TimelineEvent, LegacyTransaction as Transaction, FinancialFlowCategory as TransactionCategory };
export type { LinkedAccount };

// ---------------------------------------------------------------------------
// Balance & Monthly Stats
// ---------------------------------------------------------------------------

/**
 * Calculates net balance across all records.
 * Inflows add, outflows subtract, transfers are neutral to total balance.
 */
export const calculateBalance = (records: FinRecord[]): number => {
  return records.reduce((acc, r) => {
    if (r.direction === 'inflow') return acc + r.amount;
    if (r.direction === 'outflow') return acc - r.amount;
    return acc; // transfer: net zero
  }, 0);
};

export const getMonthlyStats = (records: FinRecord[], date: Date = new Date()) => {
  const targetMonth = date.getMonth();
  const targetYear = date.getFullYear();

  let income = 0;
  let expenses = 0;

  records.forEach(r => {
    const rDate = new Date(r.date);
    if (rDate.getMonth() === targetMonth && rDate.getFullYear() === targetYear) {
      if (r.direction === 'inflow') income += r.amount;
      else if (r.direction === 'outflow') expenses += r.amount;
    }
  });

  return { income, expenses, net: income - expenses };
};

export const calculateStableSalary = (records: FinRecord[]): number => {
  const now = new Date();
  const monthsCounted = 3;
  let totalIncome = 0;

  for (let i = 0; i < monthsCounted; i++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const stats = getMonthlyStats(records, targetDate);
    totalIncome += stats.income;
  }

  return (totalIncome / monthsCounted) * 0.8; // 20% safety buffer
};

// ---------------------------------------------------------------------------
// Category Breakdown
// ---------------------------------------------------------------------------

export const getCategoryBreakdown = (records: FinRecord[], date: Date = new Date()) => {
  const targetMonth = date.getMonth();
  const targetYear = date.getFullYear();
  const breakdown: globalThis.Record<string, number> = {};

  records.forEach(r => {
    const rDate = new Date(r.date);
    if (
      r.direction === 'outflow' &&
      rDate.getMonth() === targetMonth &&
      rDate.getFullYear() === targetYear
    ) {
      const cat = (r as OutflowRecord).flow_category ?? 'other';
      breakdown[cat] = (breakdown[cat] || 0) + r.amount;
    }
  });

  return breakdown;
};

// ---------------------------------------------------------------------------
// Timeline Generation
// ---------------------------------------------------------------------------

export const generateUpcomingTimeline = (
  records: FinRecord[],
  plans: Plan[]
): TimelineEvent[] => {
  const events: TimelineEvent[] = [];
  const now = new Date();

  records.forEach(r => {
    const rDate = new Date(r.date);
    if (rDate >= now && r.status === 'expected') {
      events.push({
        id: crypto.randomUUID(),
        title: r.title,
        date: r.date,
        amount: r.direction === 'outflow' ? -r.amount : r.amount,
        type: r.direction === 'outflow' ? 'upcoming_expense' : 'expected_income',
        status: 'pending',
      });
    }
  });

  plans.forEach(p => {
    if (p.currentAmount < p.targetAmount && new Date(p.deadline) >= now) {
      events.push({
        id: crypto.randomUUID(),
        title: `Goal Deadline: ${p.title}`,
        date: p.deadline,
        amount: p.targetAmount - p.currentAmount,
        type: 'goal_deadline',
        status: 'pending',
      });
    }
  });

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// ---------------------------------------------------------------------------
// Account Sync (now delegated to API layer — kept as thin wrapper)
// ---------------------------------------------------------------------------

export const syncLinkedAccount = async (
  account: LinkedAccount
): Promise<{ newBalance: number; newTransactions: LegacyTransaction[] }> => {
  // This is now a thin compat wrapper.
  // Real sync is handled by accountsApi.syncAccount() in services/api.ts.
  const { accountsApi } = await import('../services/api');
  const { account: updated, newRecords } = await accountsApi.syncAccount(account.id);

  const { recordToLegacy } = await import('../types/records');
  return {
    newBalance: updated.current_balance,
    newTransactions: newRecords.map(recordToLegacy),
  };
};

// ---------------------------------------------------------------------------
// Plan Feasibility
// ---------------------------------------------------------------------------

export const calculatePlanFeasibility = (
  plan: Plan,
  records: FinRecord[]
): { feasible: boolean; recommendedMonthlySave: number; risk: 'low' | 'medium' | 'high' } => {
  const stableSalary = calculateStableSalary(records);
  const { expenses: avgMonthlyExpenses } = getMonthlyStats(records);

  const freeCashflow = stableSalary - avgMonthlyExpenses;
  const remainingTarget = plan.targetAmount - plan.currentAmount;
  const monthsRemaining = Math.max(
    1,
    Math.ceil((new Date(plan.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30))
  );
  const requiredMonthlySave = remainingTarget / monthsRemaining;

  let risk: 'low' | 'medium' | 'high' = 'low';
  if (requiredMonthlySave > freeCashflow) risk = 'high';
  else if (requiredMonthlySave > freeCashflow * 0.5) risk = 'medium';

  return { feasible: requiredMonthlySave <= freeCashflow, recommendedMonthlySave: requiredMonthlySave, risk };
};

// ---------------------------------------------------------------------------
// Priority Payments
// ---------------------------------------------------------------------------

export const prioritizePayments = (
  upcomingExpenses: TimelineEvent[],
  balance: number
): { ableToPay: TimelineEvent[]; atRisk: TimelineEvent[] } => {
  let simulatedBalance = balance;
  const ableToPay: TimelineEvent[] = [];
  const atRisk: TimelineEvent[] = [];

  [...upcomingExpenses]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .forEach(exp => {
      if (simulatedBalance >= Math.abs(exp.amount)) {
        ableToPay.push(exp);
        simulatedBalance -= Math.abs(exp.amount);
      } else {
        atRisk.push(exp);
      }
    });

  return { ableToPay, atRisk };
};

// ---------------------------------------------------------------------------
// Insights Generator
// ---------------------------------------------------------------------------

export const generateInsights = (
  records: FinRecord[],
  plans: Plan[] = [],
  linkedAccounts: LinkedAccount[] = []
): string[] => {
  const insights: string[] = [];
  const currentStats = getMonthlyStats(records);
  const stableSalary = calculateStableSalary(records);

  if (currentStats.expenses > currentStats.income && currentStats.income > 0) {
    insights.push('⚠️ You are spending more than you earn this month.');
  }

  const savingsRate =
    currentStats.income > 0
      ? ((currentStats.income - currentStats.expenses) / currentStats.income) * 100
      : 0;
  if (savingsRate > 20) {
    insights.push('✅ Your savings rate is healthy this month.');
  }

  const staleAccounts = linkedAccounts.filter(
    a => a.lastSynced && new Date().getTime() - new Date(a.lastSynced).getTime() > 86400000 * 7
  );
  if (staleAccounts.length > 0) {
    insights.push(
      `🔄 You have ${staleAccounts.length} account(s) that haven't been synced in over a week.`
    );
  }

  plans.forEach(plan => {
    const { risk } = calculatePlanFeasibility(plan, records);
    if (risk === 'high') {
      insights.push(`⚠️ Your plan "${plan.title}" is at high risk of missing its deadline.`);
    }
  });

  return insights.length > 0
    ? insights
    : ['📊 Keep logging your transactions to get personalized insights.'];
};

// ---------------------------------------------------------------------------
// Validation (unchanged — kept for FinancialEntry.tsx)
// ---------------------------------------------------------------------------

export const validateTransaction = (
  title: string,
  amount: number,
  date: string
): { valid: boolean; error?: string } => {
  if (!title || title.trim() === '') return { valid: false, error: 'Title cannot be empty.' };
  if (isNaN(amount) || amount === 0) return { valid: false, error: 'Amount must be a valid non-zero number.' };
  if (isNaN(new Date(date).getTime())) return { valid: false, error: 'Invalid date provided.' };
  return { valid: true };
};
