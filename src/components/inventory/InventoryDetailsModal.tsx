// components/inventory/InventoryDetailsModal.tsx

import React from "react";
import { InventoryItem } from "@/types/inventory";
import { BatchManagementTab } from "../batch/BatchManagementTab";
import { useInventory } from "@/contexts/InventoryContext";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InventoryDetailsModalProps {
  open: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

const InventoryDetailsModal: React.FC<InventoryDetailsModalProps> = ({
  open,
  onClose,
  item,
}) => {
  const { batches } = useInventory();

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Batch Details</h2>
        </div>

        {/* Batch Tab (optional) */}
        <div className="mt-6">
          <BatchManagementTab
            item={item}
            batches={batches}
            onBatchDelete={(value) => console.log(value)}
            onBatchUpdate={(value) => console.log(value)}
            onClose={onClose}
          />
        </div>

        {/* Close Button Footer */}
        <div className="mt-6 text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetailsModal;
