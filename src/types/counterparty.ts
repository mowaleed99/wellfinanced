// ============================================================
// Counterparty Types — aligned with backend Counterparty schema
// ============================================================

export type CounterpartyCategory =
  | 'individual'
  | 'business'
  | 'ngo'
  | 'government';

/**
 * Maps to backend Counterparty entity.
 * Replaces the free-text `title` field on old Transaction.
 */
export interface Counterparty {
  id: string;
  label: string;
  description?: string;
  category: CounterpartyCategory;
}
