/**
 * API Service Layer — fully integrated with backend
 * Base: https://kamarshalaby0--wellfinanced-fastapi-app.modal.run
 *
 * NOTE: The backend has NO /api/v1 prefix. All routes are at root level.
 * All data responses are wrapped in: { data, status, title, detail }
 * List responses: { data: { items: T[], total, limit, offset } }
 */

import type { LinkedAccount } from '../types/account';
import type {
  Record as FinRecord,
  InflowRecord,
  OutflowRecord,
  Plan,
  TimelineEvent,
} from '../types/records';
import type { Notification } from '../types/notification';
import type { Asset } from '../types/asset';
import type { Installment, Schedule } from '../types/schedule';
import type { Counterparty } from '../types/counterparty';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASE_URL = 'https://kamarshalaby0--wellfinanced-fastapi-app.modal.run';

// ---------------------------------------------------------------------------
// Core fetch helper
// ---------------------------------------------------------------------------

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('wf_token');
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      detail = body?.detail ?? detail;
    } catch { /* ignore */ }
    throw new Error(detail);
  }

  return res.json() as Promise<T>;
}

/** Unwrap { data: T } envelope */
async function apiGet<T>(path: string): Promise<T> {
  const env = await apiFetch<{ data: T }>(path);
  return env.data;
}

/** Unwrap paginated { data: { items: T[] } } envelope */
async function apiList<T>(path: string): Promise<T[]> {
  const env = await apiFetch<{ data: { items: T[] } | null }>(path);
  return env.data?.items ?? [];
}

/** POST / PUT with body, unwrap { data: T } */
async function apiPost<T>(path: string, body: unknown, method = 'POST'): Promise<T> {
  const env = await apiFetch<{ data: T }>(path, {
    method,
    body: JSON.stringify(body),
  });
  return env.data;
}

// ---------------------------------------------------------------------------
// Response shape types (backend)
// ---------------------------------------------------------------------------

interface InflowSummaryResponse {
  id: string;
  direction: 'inflow';
  currency: string;
  amount: string;
  notes?: string | null;
  financial_flow_id?: string | null;
  category: string;
  counterparty_id: string;
  to_account_id: string;
  created_at: string;
}

interface OutflowSummaryResponse {
  id: string;
  direction: 'outflow';
  currency: string;
  amount: string;
  notes?: string | null;
  financial_flow_id?: string | null;
  category: string;
  from_account_id: string;
  counterparty_id: string;
  asset_id?: string | null;
  created_at: string;
}

interface AccountSummaryResponse {
  id: string;
  label: string;
  description?: string | null;
  institution?: string | null;
  currency: string;
  current_balance: string;
  status: string;
  category: string;
  created_at: string;
  incoming_record_ids: string[];
  outgoing_record_ids: string[];
}

interface AssetApiResponse {
  id: string;
  estimate_value: string;
  category: string;
  status: string;
  created_at: string;
}

interface InstallmentApiResponse {
  id: string;
  direction: string;
  financial_flow_id: string;
  amount: string;
  currency: string;
  schedule_id?: string | null;
  rescheduled_from_installment_id?: string | null;
  status: string;
  notification_ids: string[];
}

interface CounterpartySummaryResponse {
  id: string;
  label: string;
  description?: string | null;
  category: string;
  created_at: string;
  financial_flows_ids: string[];
}

// ---------------------------------------------------------------------------
// Adapters: backend → frontend types
// ---------------------------------------------------------------------------

function adaptInflow(r: InflowSummaryResponse): InflowRecord {
  return {
    id: r.id,
    direction: 'inflow',
    currency: r.currency,
    amount: parseFloat(r.amount),
    notes: r.notes ?? undefined,
    date: r.created_at.split('T')[0],
    financial_flow_id: r.financial_flow_id ?? undefined,
    category: r.category as InflowRecord['category'],
    flow_category: 'business_revenue',
    to_account_id: r.to_account_id,
    counterparty_id: r.counterparty_id,
    title: r.notes ?? `Inflow (${r.category})`,
    status: 'received',
  };
}

function adaptOutflow(r: OutflowSummaryResponse): OutflowRecord {
  return {
    id: r.id,
    direction: 'outflow',
    currency: r.currency,
    amount: parseFloat(r.amount),
    notes: r.notes ?? undefined,
    date: r.created_at.split('T')[0],
    financial_flow_id: r.financial_flow_id ?? undefined,
    category: r.category as OutflowRecord['category'],
    flow_category: 'tax_payment_zakat',
    from_account_id: r.from_account_id,
    counterparty_id: r.counterparty_id,
    asset_id: r.asset_id ?? undefined,
    title: r.notes ?? `Outflow (${r.category})`,
    status: 'cleared',
  };
}

function adaptAccount(a: AccountSummaryResponse): LinkedAccount {
  return {
    id: a.id,
    name: a.label,
    label: a.label,
    description: a.description ?? undefined,
    institution: a.institution ?? undefined,
    currency: a.currency,
    current_balance: parseFloat(a.current_balance),
    status: a.status as LinkedAccount['status'],
    category: a.category as LinkedAccount['category'],
    provider: 'bank',
    lastSynced: a.created_at,
  };
}

function adaptAsset(a: AssetApiResponse): Asset {
  return {
    id: a.id,
    name: `Asset (${a.category})`,
    estimated_value: parseFloat(a.estimate_value),
    category: a.category as Asset['category'],
    status: a.status as Asset['status'],
    currency: 'EGP',
  };
}

function adaptInstallment(i: InstallmentApiResponse): Installment {
  return {
    id: i.id,
    financial_flow_id: i.financial_flow_id,
    direction: i.direction as Installment['direction'],
    amount: parseFloat(i.amount),
    currency: i.currency,
    status: i.status as Installment['status'],
    schedule_id: i.schedule_id ?? undefined,
    rescheduled_from_id: i.rescheduled_from_installment_id ?? undefined,
  };
}

function adaptCounterparty(c: CounterpartySummaryResponse): Counterparty {
  return {
    id: c.id,
    label: c.label,
    description: c.description ?? undefined,
    category: c.category as Counterparty['category'],
  };
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const authApi = {
  /**
   * Login uses application/x-www-form-urlencoded (fastapi-users JWT flow)
   */
  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: { id: string; email: string } }> {
    const body = new URLSearchParams({
      username: credentials.email,
      password: credentials.password,
    });

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });


    if (!res.ok) {
      let detail = 'Login failed';
      try { const b = await res.json(); detail = b?.detail ?? detail; } catch { /* ignore */ }
      throw new Error(detail);
    }

    const data: { access_token: string; token_type: string } = await res.json();
    localStorage.setItem('wf_token', data.access_token);

    // Fetch the current user
    const user = await apiFetch<{ id: string; email: string }>('/auth/users/me');
    localStorage.setItem('wf_user', JSON.stringify(user));

    return { token: data.access_token, user };
  },

  /**
   * Register — FastAPI-Users uses POST /auth/register
   * Returns 201 with UserRead on success.
   * After registration, attempts auto-login. If the backend requires email
   * verification before login (LOGIN_USER_NOT_VERIFIED), we surface a clear
   * message rather than the generic "Registration failed".
   */
  async signup(data: { name: string; email: string; password: string }): Promise<{ token: string; user: { id: string; email: string } }> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (!res.ok) {
      let detail = 'Registration failed. Please try again.';
      try {
        const b = await res.json();
        if (b?.detail === 'REGISTER_USER_ALREADY_EXISTS') {
          detail = 'An account with this email already exists.';
        } else if (typeof b?.detail === 'object' && b?.detail?.reason) {
          detail = b.detail.reason;
        } else if (typeof b?.detail === 'string') {
          detail = b.detail;
        }
      } catch { /* ignore */ }
      throw new Error(detail);
    }

    const registered: { id: string; email: string } = await res.json();

    // Attempt auto-login after successful registration.
    // fastapi-users may reject login if email verification is required.
    try {
      return await authApi.login({ email: data.email, password: data.password });
    } catch (loginErr) {
      const msg = loginErr instanceof Error ? loginErr.message : String(loginErr);
      if (msg === 'LOGIN_USER_NOT_VERIFIED') {
        throw new Error('Account created! Please verify your email before logging in.');
      }
      // Return a partial object so callers can still navigate, but without a token
      return { token: '', user: { id: registered.id, email: registered.email } };
    }
  },

  async logout(): Promise<void> {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('wf_token');
      localStorage.removeItem('wf_user');
    }
  },

  async getMe(): Promise<{ id: string; email: string; is_active: boolean; is_verified: boolean }> {
    return apiFetch('/auth/users/me');
  },

  async forgotPassword(email: string): Promise<void> {
    await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },
};

// ---------------------------------------------------------------------------
// Accounts
// ---------------------------------------------------------------------------

export const accountsApi = {
  async getAccounts(): Promise<LinkedAccount[]> {
    try {
      const items = await apiList<AccountSummaryResponse>('/accounts/');
      return items.map(adaptAccount);
    } catch {
      return [];
    }
  },

  async getAccount(id: string): Promise<LinkedAccount | undefined> {
    try {
      const item = await apiGet<AccountSummaryResponse>(`/accounts/${id}`);
      return adaptAccount(item);
    } catch {
      return undefined;
    }
  },

  async createAccount(data: {
    label: string;
    description: string | null;
    institution: string | null;
    currency: string;
    current_balance: number;
    status: string;
    category: string;
  }): Promise<LinkedAccount> {
    const item = await apiPost<AccountSummaryResponse>('/accounts/', data);
    return adaptAccount(item);
  },

  async updateAccount(id: string, data: Partial<{
    label: string;
    description: string | null;
    institution: string | null;
    currency: string;
    current_balance: number;
    status: string;
    category: string;
  }>): Promise<LinkedAccount> {
    const item = await apiPost<AccountSummaryResponse>(`/accounts/${id}`, data, 'PUT');
    return adaptAccount(item);
  },

  async deleteAccount(id: string): Promise<void> {
    await apiFetch(`/accounts/${id}`, { method: 'DELETE' });
  },

  /** Stub: no sync endpoint on backend — just refreshes account data */
  async syncAccount(id: string): Promise<{ account: LinkedAccount; newRecords: FinRecord[] }> {
    const account = await accountsApi.getAccount(id);
    return { account: account!, newRecords: [] };
  },
};

// ---------------------------------------------------------------------------
// Counterparties
// ---------------------------------------------------------------------------

export const counterpartiesApi = {
  async getCounterparties(): Promise<Counterparty[]> {
    try {
      const items = await apiList<CounterpartySummaryResponse>('/counterparties/');
      return items.map(adaptCounterparty);
    } catch {
      return [];
    }
  },

  async createCounterparty(data: {
    label: string;
    description: string | null;
    category: string;
  }): Promise<Counterparty> {
    const item = await apiPost<CounterpartySummaryResponse>('/counterparties/', data);
    return adaptCounterparty(item);
  },

  async updateCounterparty(id: string, data: Partial<{ label: string; description: string | null; category: string }>): Promise<Counterparty> {
    const item = await apiPost<CounterpartySummaryResponse>(`/counterparties/${id}`, data, 'PUT');
    return adaptCounterparty(item);
  },

  async deleteCounterparty(id: string): Promise<void> {
    await apiFetch(`/counterparties/${id}`, { method: 'DELETE' });
  },
};

// ---------------------------------------------------------------------------
// Financial Flows
// ---------------------------------------------------------------------------

export const flowsApi = {
  async getFlows(): Promise<Array<{ id: string; category: string; status: string; counterparty_id: string }>> {
    try {
      return await apiList('/flows/');
    } catch {
      return [];
    }
  },

  async createFlow(data: { category: string; status: string; counterparty_id: string }): Promise<{ id: string; category: string; status: string }> {
    return apiPost('/flows/', data);
  },

  async deleteFlow(id: string): Promise<void> {
    await apiFetch(`/flows/${id}`, { method: 'DELETE' });
  },
};

// ---------------------------------------------------------------------------
// Inflows
// ---------------------------------------------------------------------------

export const inflowsApi = {
  async getInflows(): Promise<InflowRecord[]> {
    try {
      const items = await apiList<InflowSummaryResponse>('/inflows/');
      return items.map(adaptInflow);
    } catch {
      return [];
    }
  },

  async createInflow(data: {
    currency: string;
    amount: number;
    category: string;
    counterparty_id: string;
    to_account_id: string;
    notes?: string | null;
    financial_flow_id?: string | null;
  }): Promise<InflowRecord> {
    const item = await apiPost<InflowSummaryResponse>('/inflows/', data);
    return adaptInflow(item);
  },

  async deleteInflow(id: string): Promise<void> {
    await apiFetch(`/inflows/${id}`, { method: 'DELETE' });
  },
};

// ---------------------------------------------------------------------------
// Outflows
// ---------------------------------------------------------------------------

export const outflowsApi = {
  async getOutflows(): Promise<OutflowRecord[]> {
    try {
      const items = await apiList<OutflowSummaryResponse>('/outflows/');
      return items.map(adaptOutflow);
    } catch {
      return [];
    }
  },

  async createOutflow(data: {
    currency: string;
    amount: number;
    category: string;
    from_account_id: string;
    counterparty_id: string;
    notes?: string | null;
    financial_flow_id?: string | null;
    asset_id?: string | null;
  }): Promise<OutflowRecord> {
    const item = await apiPost<OutflowSummaryResponse>('/outflows/', data);
    return adaptOutflow(item);
  },

  async deleteOutflow(id: string): Promise<void> {
    await apiFetch(`/outflows/${id}`, { method: 'DELETE' });
  },
};

// ---------------------------------------------------------------------------
// Records (combined inflows + outflows — used by context)
// ---------------------------------------------------------------------------

export const recordsApi = {
  async getRecords(): Promise<FinRecord[]> {
    const [inflows, outflows] = await Promise.all([
      inflowsApi.getInflows(),
      outflowsApi.getOutflows(),
    ]);
    return [...inflows, ...outflows].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  async createRecord(data: Omit<InflowRecord | OutflowRecord, 'id'> & { id?: string }): Promise<FinRecord> {
    if (data.direction === 'inflow') {
      const d = data as InflowRecord;
      return inflowsApi.createInflow({
        currency: d.currency,
        amount: d.amount,
        category: d.category,
        counterparty_id: d.counterparty_id ?? '',
        to_account_id: d.to_account_id,
        notes: d.notes ?? d.title,
        financial_flow_id: d.financial_flow_id ?? null,
      });
    } else {
      const d = data as OutflowRecord;
      return outflowsApi.createOutflow({
        currency: d.currency,
        amount: d.amount,
        category: d.category,
        from_account_id: d.from_account_id,
        counterparty_id: d.counterparty_id ?? '',
        notes: d.notes ?? d.title,
        financial_flow_id: d.financial_flow_id ?? null,
        asset_id: d.asset_id ?? null,
      });
    }
  },

  async deleteRecord(id: string): Promise<void> {
    // Try deleting from inflows first, then outflows
    try {
      await inflowsApi.deleteInflow(id);
    } catch {
      await outflowsApi.deleteOutflow(id);
    }
  },
};

// ---------------------------------------------------------------------------
// Schedules
// ---------------------------------------------------------------------------

export const schedulesApi = {
  async getSchedules(): Promise<Schedule[]> {
    try {
      return await apiList<Schedule>('/schedules/');
    } catch {
      return [];
    }
  },

  async createSchedule(data: Partial<Schedule>): Promise<Schedule> {
    return apiPost<Schedule>('/schedules/', {
      start_year: data.start_year ?? null,
      end_year: data.end_year ?? null,
      start_month: data.start_month ?? null,
      end_month: data.end_month ?? null,
      start_day_of_month: data.start_day_of_month ?? null,
      end_day_of_month: data.end_day_of_month ?? null,
      start_day_of_week: data.start_day_of_week ?? null,
      end_day_of_week: data.end_day_of_week ?? null,
      start_hour: data.start_hour ?? null,
      end_hour: data.end_hour ?? null,
      start_minute: data.start_minute ?? null,
      end_minute: data.end_minute ?? null,
    });
  },

  async deleteSchedule(id: string): Promise<void> {
    await apiFetch(`/schedules/${id}`, { method: 'DELETE' });
  },
};

// ---------------------------------------------------------------------------
// Installments
// ---------------------------------------------------------------------------

export const installmentsApi = {
  async getInstallments(): Promise<Installment[]> {
    try {
      const items = await apiList<InstallmentApiResponse>('/installments/');
      return items.map(adaptInstallment);
    } catch {
      return [];
    }
  },

  async createInstallment(data: Omit<Installment, 'id'>): Promise<Installment> {
    const item = await apiPost<InstallmentApiResponse>('/installments/', {
      direction: data.direction,
      financial_flow_id: data.financial_flow_id,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      schedule_id: data.schedule_id ?? null,
      rescheduled_from_installment_id: data.rescheduled_from_id ?? null,
    });
    return adaptInstallment(item);
  },

  async deleteInstallment(id: string): Promise<void> {
    await apiFetch(`/installments/${id}`, { method: 'DELETE' });
  },
};

// ---------------------------------------------------------------------------
// Assets
// ---------------------------------------------------------------------------

export const assetsApi = {
  async getAssets(): Promise<Asset[]> {
    try {
      const items = await apiList<AssetApiResponse>('/assets/');
      return items.map(adaptAsset);
    } catch {
      return [];
    }
  },

  async createAsset(data: { estimate_value: number; category: string; status: string }): Promise<Asset> {
    const item = await apiPost<AssetApiResponse>('/assets/', data);
    return adaptAsset(item);
  },

  async updateAsset(id: string, data: Partial<{ estimate_value: number; category: string; status: string }>): Promise<Asset> {
    const item = await apiPost<AssetApiResponse>(`/assets/${id}`, data, 'PUT');
    return adaptAsset(item);
  },

  async deleteAsset(id: string): Promise<void> {
    await apiFetch(`/assets/${id}`, { method: 'DELETE' });
  },
};

// ---------------------------------------------------------------------------
// Notifications (no backend endpoint — kept in-memory for now)
// ---------------------------------------------------------------------------

const IN_MEM_NOTIFICATIONS: Notification[] = [];

export const notificationsApi = {
  async getNotifications(): Promise<Notification[]> {
    return IN_MEM_NOTIFICATIONS;
  },

  async markAllRead(): Promise<void> {
    IN_MEM_NOTIFICATIONS.forEach(n => { n.status = 'viewed'; });
  },

  async updateNotification(id: string, status: Notification['status']): Promise<Notification> {
    const n = IN_MEM_NOTIFICATIONS.find(n => n.id === id);
    if (n) n.status = status;
    return n!;
  },
};

// ---------------------------------------------------------------------------
// Plans (no backend endpoint — in-memory store)
// ---------------------------------------------------------------------------

const IN_MEM_PLANS: Plan[] = [
  { id: '1', title: 'Emergency Fund', targetAmount: 12000, currentAmount: 8450, deadline: '2024-12-31', priority: 'high' },
  { id: '2', title: 'New Workstation', targetAmount: 3500, currentAmount: 1200, deadline: '2025-01-31', priority: 'medium' },
];

export const plansApi = {
  async getPlans(): Promise<Plan[]> {
    return [...IN_MEM_PLANS];
  },

  async createPlan(data: Omit<Plan, 'id'>): Promise<Plan> {
    const plan = { ...data, id: crypto.randomUUID() };
    IN_MEM_PLANS.push(plan);
    return plan;
  },

  async updatePlan(id: string, currentAmount: number): Promise<Plan> {
    const plan = IN_MEM_PLANS.find(p => p.id === id);
    if (plan) plan.currentAmount = currentAmount;
    return plan!;
  },
};

// ---------------------------------------------------------------------------
// Dashboard (derived — no dedicated endpoint)
// ---------------------------------------------------------------------------

export const dashboardApi = {
  async getDashboardData(): Promise<{
    netBalance: number;
    status: string;
    expectedIncome: number;
    committedExpenses: number;
  }> {
    const accounts = await accountsApi.getAccounts();
    const netBalance = accounts.reduce((sum, a) => sum + a.current_balance, 0);
    return {
      netBalance,
      status: netBalance > 0 ? 'Healthy' : 'Review Needed',
      expectedIncome: 0,
      committedExpenses: 0,
    };
  },

  async getIncomeForecast(): Promise<{
    confidence: string;
    next30Days: { min: number; max: number };
    next60Days: { min: number; max: number; warning: boolean; threshold: number };
  }> {
    return {
      confidence: 'Calculating...',
      next30Days: { min: 0, max: 0 },
      next60Days: { min: 0, max: 0, warning: false, threshold: 0 },
    };
  },
};

// ---------------------------------------------------------------------------
// Timeline (derived — no dedicated endpoint)
// ---------------------------------------------------------------------------

export const timelineApi = {
  async getTimelineEvents(): Promise<TimelineEvent[]> {
    try {
      const installments = await installmentsApi.getInstallments();
      return installments
        .filter(i => i.status === 'pending')
        .slice(0, 10)
        .map(i => ({
          id: i.id,
          title: `${i.direction === 'inflow' ? 'Expected Payment' : 'Upcoming Expense'}`,
          date: new Date().toISOString(),
          amount: i.amount,
          type: i.direction === 'inflow' ? ('expected_income' as const) : ('upcoming_expense' as const),
          status: 'pending' as const,
        }));
    } catch {
      return [];
    }
  },
};

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

export const imagesApi = {
  async uploadImage(file: File): Promise<{ id: string; url: string }> {
    const token = localStorage.getItem('wf_token');
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${BASE_URL}/images/uploads`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const env = await res.json();
    return env.data;
  },

  async getImage(id: string): Promise<{ id: string; url: string }> {
    return apiGet(`/images/uploads/${id}`);
  },
};
