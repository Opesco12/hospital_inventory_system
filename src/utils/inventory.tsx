import { InventoryItem, Batch } from "@/types/inventory";

export const calculateItemQuantities = (
  items: Omit<InventoryItem, "quantity">[],
  batches: Batch[]
): InventoryItem[] => {
  return items.map((item) => {
    let totalQuantity = 0;

    // Find all batches that contain this item
    item.batchIds.forEach((batchId) => {
      const batch = batches.find((b) => b.batchNumber === batchId);
      if (batch) {
        // Find the item entry in the batch
        const batchItem = batch.items.find((i) => i.itemId === item.id);
        if (batchItem) {
          totalQuantity += batchItem.quantity;
        }
      }
    });

    // Return the item with the calculated quantity
    return {
      ...item,
      quantity: totalQuantity,
    };
  });
};
