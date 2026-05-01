/**
 * Central barrel export for all domain types.
 * Import from here instead of individual type files for cleaner code.
 *
 * Example:
 *   import type { Account, InflowRecord, Notification } from '../types';
 */

export type { Account, AccountStatus, AccountCategory, LinkedAccount } from './account';
export type { Counterparty, CounterpartyCategory } from './counterparty';
export type { Asset, AssetCategory, AssetStatus } from './asset';
export type {
  Record,
  InflowRecord,
  OutflowRecord,
  TransferRecord,
  BaseRecord,
  FinancialFlow,
  FinancialFlowCategory,
  FinancialFlowStatus,
  RecordDirection,
  InflowCategory,
  OutflowCategory,
  InstallmentStatus,
  RecordStatus,
  Plan,
  TimelineEvent,
  LegacyTransaction,
} from './records';
export { mapLegacyTransaction, recordToLegacy } from './records';
export type { Schedule, Installment, Reminder } from './schedule';
export type { Notification, NotificationReason, NotificationStatus } from './notification';
