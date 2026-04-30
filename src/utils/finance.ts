export type TransactionCategory = 'food' | 'rent' | 'transport' | 'freelance' | 'software' | 'other' | 'savings';

export type LinkedAccount = {
  id: string;
  name: string;
  provider: 'vodafone_cash' | 'bank' | 'paypal' | 'instapay';
  balance: number;
  lastSynced: string;
};

export type Plan = {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
};

export type TimelineEvent = {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'upcoming_expense' | 'expected_income' | 'goal_deadline';
  status: 'pending' | 'cleared' | 'overdue';
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string; // ISO String YYYY-MM-DD
  category: TransactionCategory;
  accountId?: string;
  status?: 'received' | 'expected' | 'cleared';
  recurrence?: 'monthly' | 'weekly' | 'yearly';
  scheduleDate?: string;
};

export const calculateBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((acc, t) => acc + t.amount, 0);
};

export const getMonthlyStats = (transactions: Transaction[], date: Date = new Date()) => {
  const targetMonth = date.getMonth();
  const targetYear = date.getFullYear();

  let income = 0;
  let expenses = 0;

  transactions.forEach(t => {
    const tDate = new Date(t.date);
    if (tDate.getMonth() === targetMonth && tDate.getFullYear() === targetYear) {
      if (t.type === 'income') income += t.amount;
      else expenses += Math.abs(t.amount);
    }
  });

  return { income, expenses, net: income - expenses };
};

export const calculateStableSalary = (transactions: Transaction[]): number => {
  const now = new Date();
  let totalIncome = 0;
  let monthsCounted = 3;

  for (let i = 0; i < monthsCounted; i++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const stats = getMonthlyStats(transactions, targetDate);
    totalIncome += stats.income;
  }

  const averageIncome = totalIncome / monthsCounted;
  return averageIncome * 0.8; // 20% safety buffer
};

export const getCategoryBreakdown = (transactions: Transaction[], date: Date = new Date()) => {
  const targetMonth = date.getMonth();
  const targetYear = date.getFullYear();

  const breakdown: Record<string, number> = {};

  transactions.forEach(t => {
    const tDate = new Date(t.date);
    if (t.type === 'expense' && tDate.getMonth() === targetMonth && tDate.getFullYear() === targetYear) {
      breakdown[t.category] = (breakdown[t.category] || 0) + Math.abs(t.amount);
    }
  });

  return breakdown;
};

// =======================
// SYSTEM CORE LOGIC
// =======================

export const generateUpcomingTimeline = (transactions: Transaction[], plans: Plan[]): TimelineEvent[] => {
  const events: TimelineEvent[] = [];
  const now = new Date();

  // Add expected/recurring transactions
  transactions.forEach(t => {
    if (t.recurrence || t.status === 'expected') {
      const eventDate = t.scheduleDate || t.date;
      if (new Date(eventDate) >= now) {
        events.push({
          id: crypto.randomUUID(),
          title: t.title,
          date: eventDate,
          amount: t.amount,
          type: t.type === 'expense' ? 'upcoming_expense' : 'expected_income',
          status: 'pending'
        });
      }
    }
  });

  // Add plan deadlines
  plans.forEach(p => {
    if (p.currentAmount < p.targetAmount && new Date(p.deadline) >= now) {
      events.push({
        id: crypto.randomUUID(),
        title: `Goal Deadline: ${p.title}`,
        date: p.deadline,
        amount: p.targetAmount - p.currentAmount,
        type: 'goal_deadline',
        status: 'pending'
      });
    }
  });

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const syncLinkedAccount = async (account: LinkedAccount): Promise<{ newBalance: number, newTransactions: Transaction[] }> => {
  // Mock API behavior for syncing external accounts (e.g. Vodafone Cash, Bank)
  return new Promise((resolve) => {
    setTimeout(() => {
      const isVodafone = account.provider === 'vodafone_cash';
      const mockTransactions: Transaction[] = [
        {
          id: crypto.randomUUID(),
          title: isVodafone ? 'Client Transfer (Vodafone)' : 'Bank Interest',
          amount: isVodafone ? 150 : 12.50,
          type: 'income',
          date: new Date().toISOString().split('T')[0],
          category: isVodafone ? 'freelance' : 'other',
          accountId: account.id,
          status: 'cleared'
        }
      ];
      
      resolve({
        newBalance: account.balance + mockTransactions[0].amount,
        newTransactions: mockTransactions
      });
    }, 1500); // simulate network delay
  });
};

export const calculatePlanFeasibility = (plan: Plan, transactions: Transaction[]): { feasible: boolean; recommendedMonthlySave: number; risk: 'low' | 'medium' | 'high' } => {
  const stableSalary = calculateStableSalary(transactions);
  const currentStats = getMonthlyStats(transactions);
  const avgMonthlyExpenses = currentStats.expenses; // in a real app, average over 3 months
  
  const freeCashflow = stableSalary - avgMonthlyExpenses;
  const remainingTarget = plan.targetAmount - plan.currentAmount;
  
  const monthsRemaining = Math.max(1, Math.ceil((new Date(plan.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30)));
  const requiredMonthlySave = remainingTarget / monthsRemaining;

  let risk: 'low' | 'medium' | 'high' = 'low';
  if (requiredMonthlySave > freeCashflow) risk = 'high';
  else if (requiredMonthlySave > freeCashflow * 0.5) risk = 'medium';

  return {
    feasible: requiredMonthlySave <= freeCashflow,
    recommendedMonthlySave: requiredMonthlySave,
    risk
  };
};

export const prioritizePayments = (upcomingExpenses: TimelineEvent[], balance: number): { ableToPay: TimelineEvent[], atRisk: TimelineEvent[] } => {
  let simulatedBalance = balance;
  const ableToPay: TimelineEvent[] = [];
  const atRisk: TimelineEvent[] = [];

  // Sort by earliest date first
  const sorted = [...upcomingExpenses].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sorted.forEach(exp => {
    if (simulatedBalance >= Math.abs(exp.amount)) {
      ableToPay.push(exp);
      simulatedBalance -= Math.abs(exp.amount);
    } else {
      atRisk.push(exp);
    }
  });

  return { ableToPay, atRisk };
};

export const generateInsights = (transactions: Transaction[], plans: Plan[] = [], linkedAccounts: LinkedAccount[] = []) => {
  const insights: string[] = [];
  const currentStats = getMonthlyStats(transactions);
  const stableSalary = calculateStableSalary(transactions);
  const breakdown = getCategoryBreakdown(transactions);
  
  // Spend vs Earn insight
  if (currentStats.expenses > currentStats.income && currentStats.income > 0) {
    insights.push("⚠️ You are spending more than you earn this month.");
  }

  // Savings insight
  const savingsRate = currentStats.income > 0 ? ((currentStats.income - currentStats.expenses) / currentStats.income) * 100 : 0;
  if (savingsRate > 20) {
    insights.push("✅ Your savings rate is healthy this month.");
  }

  // Account sync insights
  const staleAccounts = linkedAccounts.filter(a => (new Date().getTime() - new Date(a.lastSynced).getTime()) > 86400000 * 7); // 7 days
  if (staleAccounts.length > 0) {
    insights.push(`🔄 You have ${staleAccounts.length} account(s) that haven't been synced in over a week.`);
  }

  // Plan risk insights
  plans.forEach(plan => {
    const { risk } = calculatePlanFeasibility(plan, transactions);
    if (risk === 'high') {
      insights.push(`⚠️ Your plan "${plan.title}" is at high risk of missing its deadline based on cashflow.`);
    }
  });

  return insights.length > 0 ? insights : ["📊 Keep logging your transactions to get personalized insights."];
};

export const validateTransaction = (title: string, amount: number, date: string): { valid: boolean; error?: string } => {
  if (!title || title.trim() === '') return { valid: false, error: "Title cannot be empty." };
  if (isNaN(amount) || amount === 0) return { valid: false, error: "Amount must be a valid non-zero number." };
  if (isNaN(new Date(date).getTime())) return { valid: false, error: "Invalid date provided." };
  return { valid: true };
};
