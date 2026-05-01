// ============================================================
// Schedule + Installment + Reminder Types
// Aligned with backend Schedule, Installment, Reminder schemas
// ============================================================

import type { RecordDirection, InstallmentStatus } from './records';

/**
 * Maps to backend Schedule entity.
 * Models the full time-range and recurrence granularity.
 */
export interface Schedule {
  id: string;
  start_year?: number;
  end_year?: number;
  start_month?: number;
  end_month?: number;
  start_day_of_month?: number;
  end_day_of_month?: number;
  start_day_of_week?: number; // 0 = Sunday
  end_day_of_week?: number;
  start_hour?: number;
  end_hour?: number;
  start_minute?: number;
  end_minute?: number;
}

/**
 * Maps to backend Installment entity.
 * Represents a single payment event within a FinancialFlow.
 */
export interface Installment {
  id: string;
  financial_flow_id: string;
  direction: RecordDirection;
  amount: number;
  currency: string;
  status: InstallmentStatus;
  schedule_id?: string;
  /** Self-referential: if this installment was rescheduled from another */
  rescheduled_from_id?: string;
}

/**
 * Maps to backend Reminder entity.
 * Links to an Installment and its Schedule.
 */
export interface Reminder {
  id: string;
  installment_id: string;
  schedule_id?: string;
}
