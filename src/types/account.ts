// ============================================================
// Account Types — aligned with backend Account schema
// ============================================================

export type AccountStatus =
  | 'active'
  | 'archived'
  | 'inactive'
  | 'closed'
  | 'frozen'
  | 'hidden'
  | 'pending';

export type AccountCategory =
  | 'cash'
  | 'checking'
  | 'savings'
  | 'wallet'
  | 'investment'
  | 'receivable'
  | 'escrow';

/**
 * Maps to backend Account entity.
 * Replaces the old flat `LinkedAccount` type.
 */
export interface Account {
  id: string;
  name: string;
  label?: string;
  institution?: string;
  description?: string;
  currency: string;
  current_balance: number;
  status: AccountStatus;
  category: AccountCategory;
  /** ISO datetime string — used by sync logic */
  lastSynced?: string;
}

// ---------------------------------------------------------------------------
// Backward-compatibility alias so existing UI code that imports
// `LinkedAccount` from utils/finance continues to compile unchanged.
// ---------------------------------------------------------------------------
export type LinkedAccount = Account & {
  /** Legacy field kept for LinkedAccounts.tsx provider display */
  provider: 'vodafone_cash' | 'bank' | 'paypal' | 'instapay';
};
