export interface InventoryItem {
  id: string;
  name: string;
  categoryId: string;
  quantity: number; // This will be calculated from batch data
  unit: string;
  batchIds: string[];
}

export interface Batch {
  batchNumber: string;
  expiryDate: string;
  manufacturingDate: string;
  supplier: string;
  receiptDate: string;
  items: { itemId: string; quantity: number }[];
}

export interface Category {
  id: string;
  name: string;
  itemCount?: number;
  description: string;
  color: string;
  requiresExpiryTracking?: boolean;
}
