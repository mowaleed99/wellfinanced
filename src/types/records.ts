// ============================================================
// Record Types — aligned with backend Record/Inflow/Outflow/Transfer schemas
// Replaces the old flat `Transaction` type entirely.
// ============================================================

// ---------------------------
// Enums (mirror backend enums)
// ---------------------------

export type RecordDirection = 'inflow' | 'outflow' | 'transfer';

export type InflowCategory =
  | 'income'
  | 'support'
  | 'liability';

export type OutflowCategory =
  | 'consumable'
  | 'purchase'
  | 'payment';

export type FinancialFlowCategory =
  | 'salary_wages'
  | 'prize'
  | 'freelance_contract_payment'
  | 'business_revenue'
  | 'investment_dividend'
  | 'property_rent'
  | 'government_benefits_aid'
  | 'scholarship_stipend'
  | 'ngo_charity_donation'
  | 'friends_family_gift'
  | 'inheritance'
  | 'compensation_insurance'
  | 'debt'
  | 'transfer'
  | 'sell_assets_cash_out_investments'
  | 'tax_payment_zakat'
  | 'saving_goal';

export type FinancialFlowStatus = 'active' | 'inactive' | 'closed';

export type InstallmentStatus = 'pending' | 'completed' | 'missed';

export type RecordStatus = 'received' | 'expected' | 'cleared';

// ---------------------------
// Financial Flow
// ---------------------------

/**
 * Maps to backend FinancialFlow entity.
 * A flow groups related records (e.g. a recurring salary, a loan).
 */
export interface FinancialFlow {
  id: string;
  category: FinancialFlowCategory;
  status: FinancialFlowStatus;
}

// ---------------------------
// Base Record
// ---------------------------

/**
 * Maps to backend Record base entity.
 */
export interface BaseRecord {
  id: string;
  direction: RecordDirection;
  currency: string;
  amount: number;
  notes?: string;
  /** ISO date string YYYY-MM-DD */
  date: string;
  financial_flow_id?: string;
  status?: RecordStatus;
}

// ---------------------------
// Inflow Record
// ---------------------------

/**
 * Maps to backend InflowRecord entity.
 * Replaces `Transaction` with type === 'income'.
 */
export interface InflowRecord extends BaseRecord {
  direction: 'inflow';
  category: InflowCategory;
  flow_category: FinancialFlowCategory;
  /** ID of the receiving Account */
  to_account_id: string;
  /** Optional Counterparty ID (payer / source) */
  counterparty_id?: string;
  /** Free-text label kept for UI display (backward compat) */
  title: string;
}

// ---------------------------
// Outflow Record
// ---------------------------

/**
 * Maps to backend OutflowRecord entity.
 * Replaces `Transaction` with type === 'expense'.
 */
export interface OutflowRecord extends BaseRecord {
  direction: 'outflow';
  category: OutflowCategory;
  flow_category: FinancialFlowCategory;
  /** ID of the debiting Account */
  from_account_id: string;
  /** Optional Counterparty ID (payee / vendor) */
  counterparty_id?: string;
  /** Optional Asset ID if purchase is an asset */
  asset_id?: string;
  /** Free-text label kept for UI display (backward compat) */
  title: string;
}

// ---------------------------
// Transfer Record
// ---------------------------

/**
 * Maps to backend TransferRecord entity.
 * New type — did not exist in old Transaction model.
 */
export interface TransferRecord extends BaseRecord {
  direction: 'transfer';
  from_account_id: string;
  to_account_id: string;
  /** Free-text label kept for UI display */
  title: string;
}

// ---------------------------
// Discriminated Union
// ---------------------------

/** The canonical union type that replaces `Transaction` everywhere. */
export type Record = InflowRecord | OutflowRecord | TransferRecord;

// ---------------------------
// Plan / Goal (unchanged shape, kept here for single source of truth)
// ---------------------------

export interface Plan {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

// ---------------------------
// Timeline Event (derived — not a backend entity)
// ---------------------------

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'upcoming_expense' | 'expected_income' | 'goal_deadline';
  status: 'pending' | 'cleared' | 'overdue';
}

// ============================================================
// BACKWARD COMPATIBILITY LAYER
// Maps old flat Transaction shape → new Record union type.
// Allows UI pages to keep using the old shape during migration.
// ============================================================

/** The old Transaction type — kept ONLY for the compat mapper below. */
export interface LegacyTransaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
  accountId?: string;
  status?: RecordStatus;
  recurrence?: 'monthly' | 'weekly' | 'yearly';
  scheduleDate?: string;
}

/**
 * Maps a legacy Transaction → new Record union type.
 * Used inside FinanceContext so the UI layer is unaffected.
 */
export function mapLegacyTransaction(t: LegacyTransaction): Record {
  const base: BaseRecord = {
    id: t.id,
    direction: t.type === 'income' ? 'inflow' : 'outflow',
    currency: 'USD',
    amount: Math.abs(t.amount),
    date: t.date,
    status: t.status,
    notes: undefined,
  };

  if (t.type === 'income') {
    return {
      ...base,
      direction: 'inflow',
      title: t.title,
      category: 'income',
      flow_category: mapCategoryToFlow(t.category, 'income'),
      to_account_id: t.accountId ?? 'default',
    } as InflowRecord;
  }

  return {
    ...base,
    direction: 'outflow',
    title: t.title,
    category: 'payment',
    flow_category: mapCategoryToFlow(t.category, 'expense'),
    from_account_id: t.accountId ?? 'default',
  } as OutflowRecord;
}

/**
 * Maps a new Record back to LegacyTransaction shape.
 * Lets Dashboard / FinancialEntry pages read records without changes.
 */
export function recordToLegacy(r: Record): LegacyTransaction {
  return {
    id: r.id,
    title: r.title,
    amount: r.direction === 'outflow' ? -r.amount : r.amount,
    type: r.direction === 'inflow' ? 'income' : 'expense',
    date: r.date,
    category: r.direction === 'inflow'
      ? (r as InflowRecord).flow_category
      : (r as OutflowRecord).flow_category,
    accountId:
      r.direction === 'inflow'
        ? (r as InflowRecord).to_account_id
        : r.direction === 'outflow'
        ? (r as OutflowRecord).from_account_id
        : undefined,
    status: r.status,
  };
}

// Helper: map old flat category string → FinancialFlowCategory
function mapCategoryToFlow(
  cat: string,
  dir: 'income' | 'expense'
): FinancialFlowCategory {
  const map: Record<string, FinancialFlowCategory> = {
    freelance: 'freelance_contract_payment',
    software: 'tax_payment_zakat',
    food: 'tax_payment_zakat',
    rent: 'property_rent',
    transport: 'tax_payment_zakat',
    savings: 'saving_goal',
    other: dir === 'income' ? 'business_revenue' : 'tax_payment_zakat',
  };
  return map[cat] ?? (dir === 'income' ? 'business_revenue' : 'tax_payment_zakat');
}
