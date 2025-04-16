import React, { useState } from "react";
import { Calendar, Clock, Package, AlertTriangle, Trash2 } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";
import InventoryDetailsModal from "../inventory/InventoryDetailsModal";
import AddBatchModal from "./AddBatchModal";
import { toast } from "sonner";

export const BatchManagementTab = ({
  item,
  // batches,
  onBatchUpdate,
  onBatchDelete,
  onClose,
}) => {
  const [sortOrder, setSortOrder] = useState("expiry-asc"); // Default: show earliest expiring first
  const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false);

  const { addBatchToInventory, batches } = useInventory();

  // Get the actual batch objects from the batch IDs
  const itemBatches = item.batchIds
    .map((batchId) => batches.find((batch) => batch.batchNumber === batchId))
    .filter(Boolean);

  // Sort batches based on selection
  const sortedBatches = [...itemBatches].sort((a, b) => {
    if (sortOrder === "expiry-asc") {
      return new Date(a.expiryDate) - new Date(b.expiryDate);
    } else if (sortOrder === "expiry-desc") {
      return new Date(b.expiryDate) - new Date(a.expiryDate);
    } else if (sortOrder === "receipt-asc") {
      return new Date(a.receiptDate) - new Date(b.receiptDate);
    } else if (sortOrder === "receipt-desc") {
      return new Date(b.receiptDate) - new Date(a.receiptDate);
    }
    return 0;
  });

  // Determine if a batch is close to expiry (within 90 days)
  const isNearExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 90 && daysUntilExpiry >= 0;
  };

  // Determine if batch is expired
  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  const handleBatchSave = (values) => {
    try {
      addBatchToInventory(values);
      setIsBatchModalOpen(false);

      toast.success("Batch added successfully!");

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold"></h2>
        <div className="flex gap-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="expiry-asc">Soonest Expiry First</option>
            <option value="expiry-desc">Latest Expiry First</option>
            <option value="receipt-asc">Oldest Received First</option>
            <option value="receipt-desc">Newest Received First</option>
          </select>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => {
              setIsBatchModalOpen(true);
            }}
          >
            Add Batch
          </button>
        </div>
      </div>

      {sortedBatches.length === 0 ? (
        <div className=" p-6 text-center ">
          <p className="text-gray-500">No batches found for this item</p>
          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => {
              setIsBatchModalOpen(true);
            }}
          >
            Add First Batch
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Batch Number</th>
                <th className="px-4 py-2 text-left">Expiry Date</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Supplier</th>
                <th className="px-4 py-2 text-left">Received Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBatches.map((batch) => {
                const expired = isExpired(batch.expiryDate);
                const nearExpiry = isNearExpiry(batch.expiryDate);

                // Find the item entry for this specific batch
                const itemEntry = batch.items.find((i) => i.itemId === item.id);
                const quantity = itemEntry ? itemEntry.quantity : 0;

                return (
                  <tr
                    key={batch.batchNumber}
                    className={`
                      border-t
                      ${
                        expired ? "bg-red-50" : nearExpiry ? "bg-yellow-50" : ""
                      }
                    `}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        {batch.batchNumber}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {batch.expiryDate}
                        {expired && (
                          <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            Expired
                          </span>
                        )}
                        {nearExpiry && !expired && (
                          <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">
                            Expiring Soon
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {quantity} {item.unit}
                    </td>
                    <td className="px-4 py-3">{batch.supplier}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {batch.receiptDate}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {expired ? (
                        <div className="flex items-center text-red-500 gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Expired</span>
                        </div>
                      ) : nearExpiry ? (
                        <div className="flex items-center text-yellow-500 gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Use First</span>
                        </div>
                      ) : (
                        <span className="text-green-500">Good</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            /* Edit batch */
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => onBatchDelete(batch.batchNumber)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <AddBatchModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        onSave={handleBatchSave}
        itemId={item?.id}
      />
    </div>
  );
};
