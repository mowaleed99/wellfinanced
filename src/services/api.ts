/**
 * Mock API Service
 * 
 * Replace these functions with actual fetch() or axios calls to your backend endpoints
 * when the API is ready.
 */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // --- AUTHENTICATION ---
  async login(credentials: any) {
    await delay(1500); // Simulate network latency
    // Example future real call:
    // return fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) }).then(r => r.json());
    return { token: 'mock-jwt-token', user: { id: 1, name: 'Freelancer' } };
  },

  async signup(data: any) {
    await delay(2000);
    return { token: 'mock-jwt-token', user: { id: 1, name: data.name } };
  },

  // --- DASHBOARD & CASHFLOW ---
  async getDashboardData() {
    await delay(800);
    return {
      netBalance: 4250.00,
      status: 'Healthy',
      expectedIncome: 5400,
      committedExpenses: 1150,
    };
  },

  async getIncomeForecast() {
    await delay(1000);
    return {
      confidence: 'High Confidence',
      next30Days: { min: 4000, max: 6000 },
      next60Days: { min: 3000, max: 4500, warning: true, threshold: 3200 }
    };
  },

  // --- PLANS & GOALS ---
  async getFinancialPlans() {
    await delay(600);
    return {
      currentSalary: 4500,
      averageIncome: 5200,
      goals: [
        { id: 1, name: 'Emergency Fund', target: 10000, saved: 4500, deadline: '2024-12-31', recommendation: 850 },
        { id: 2, name: 'Tax Reserve Q4', target: 3200, saved: 1100, deadline: '2024-10-15', recommendation: 700 }
      ]
    };
  },

  async updateSalaryAllocation(amount: number) {
    await delay(500);
    return { success: true, amount };
  },

  // --- TIMELINE / OBLIGATIONS ---
  async getTimelineObligations() {
    await delay(700);
    return [
      { id: 1, type: 'bill', name: 'AWS Hosting', amount: 45.00, due: '2024-10-02', priority: 'high', risk: false },
      { id: 2, type: 'debt', name: 'Chase Credit Card Minimum', amount: 120.00, due: '2024-10-05', priority: 'critical', risk: true },
      { id: 3, type: 'goal', name: 'Tax Reserve Contribution', amount: 700.00, due: '2024-10-15', priority: 'medium', risk: false },
      { id: 4, type: 'bill', name: 'Adobe Creative Cloud', amount: 54.99, due: '2024-10-18', priority: 'low', risk: false }
    ];
  },

  // --- LEDGER / HISTORY ---
  async getTransactions() {
    await delay(800);
    return [
      { id: 1, title: 'Client Alpha - Website', date: 'Oct 1, 2024', amount: 2400, type: 'income', status: 'received' },
      { id: 2, title: 'Adobe Creative Cloud', date: 'Sep 28, 2024', amount: -54.99, type: 'expense', recurrence: 'monthly' },
      { id: 3, title: 'AWS Hosting', date: 'Sep 25, 2024', amount: -12.50, type: 'expense', recurrence: 'monthly' },
      { id: 4, title: 'Logo Design - StartupX', date: 'Sep 15, 2024', amount: 850, type: 'income', status: 'expected' },
    ];
  },

  async addTransaction(data: any) {
    await delay(800);
    return { success: true, transaction: { id: Date.now(), ...data } };
  }
};
