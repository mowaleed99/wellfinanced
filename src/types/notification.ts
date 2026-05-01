// ============================================================
// Notification Types — aligned with backend Notification schema
// ============================================================

export type NotificationReason =
  | 'suggestion'
  | 'reminder'
  | 'warning'
  | 'alert';

export type NotificationStatus =
  | 'pending'
  | 'viewed'
  | 'accepted'
  | 'rejected';

/**
 * Maps to backend Notification entity.
 * Replaces the static hardcoded array in NotificationsCenter.tsx.
 */
export interface Notification {
  id: string;
  reason: NotificationReason;
  message: string;
  status: NotificationStatus;
  installment_id?: string;
  /** ISO datetime string */
  created_at: string;
}
