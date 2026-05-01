// ============================================================
// Asset Types — aligned with backend Asset schema
// ============================================================

export type AssetCategory = 'stocks' | 'property';

export type AssetStatus =
  | 'active'
  | 'idle_reserved'
  | 'temporarily_unavailable'
  | 'impaired'
  | 'disposed_retired'
  | 'written_off';

/**
 * Maps to backend Asset entity.
 */
export interface Asset {
  id: string;
  name: string;
  estimated_value: number;
  category: AssetCategory;
  status: AssetStatus;
  currency?: string;
  description?: string;
}
