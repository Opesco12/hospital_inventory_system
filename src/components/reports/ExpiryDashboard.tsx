import { useState } from "react";

import { useInventory } from "@/contexts/InventoryContext";

const ExpiryDashboard = ({}) => {
  const { items, categories, batches } = useInventory();

  const [timeFrame, setTimeFrame] = useState("30");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get all batches with their associated items
  const batchesWithItems = batches.map((batch) => {
    const batchItems = batch.items.map((batchItem) => {
      const item = items.find((i) => i.id === batchItem.itemId);
      return {
        ...batchItem,
        itemName: item?.name || "Unknown Item",
        categoryId: item?.categoryId || "unknown",
        unit: item?.unit || "unit",
      };
    });
    return {
      ...batch,
      expandedItems: batchItems,
    };
  });

  // Filter batches by expiry date and category
  const filteredBatches = batchesWithItems.filter((batch) => {
    const expiryDate = new Date(batch.expiryDate);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Filter by expiry timeframe
    const isInTimeFrame = diffDays <= parseInt(timeFrame) && diffDays >= 0;

    // Filter by category
    const isInCategory =
      selectedCategory === "all" ||
      batch.expandedItems.some((item) => item.categoryId === selectedCategory);

    return isInTimeFrame && isInCategory;
  });

  // Group by days until expiry for summary stats
  const getExpiryGroups = () => {
    const groups = {
      immediate: 0, // 0-15 days
      soon: 0, // 16-30 days
      upcoming: 0, // 31-60 days
      future: 0, // 61-90 days
    };

    batchesWithItems.forEach((batch) => {
      const expiryDate = new Date(batch.expiryDate);
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        // Skip expired items
      } else if (diffDays <= 15) {
        groups.immediate++;
      } else if (diffDays <= 30) {
        groups.soon++;
      } else if (diffDays <= 60) {
        groups.upcoming++;
      } else if (diffDays <= 90) {
        groups.future++;
      }
    });

    return groups;
  };

  const expiryGroups = getExpiryGroups();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Expiry Summary</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-medium text-red-700">Immediate Attention</h3>
            <p className="text-2xl font-bold text-red-600">
              {expiryGroups.immediate}
            </p>
            <p className="text-sm text-red-500">Expires in 0-15 days</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="font-medium text-yellow-700">Soon</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {expiryGroups.soon}
            </p>
            <p className="text-sm text-yellow-500">Expires in 16-30 days</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-700">Upcoming</h3>
            <p className="text-2xl font-bold text-blue-600">
              {expiryGroups.upcoming}
            </p>
            <p className="text-sm text-blue-500">Expires in 31-60 days</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-700">Future</h3>
            <p className="text-2xl font-bold text-green-600">
              {expiryGroups.future}
            </p>
            <p className="text-sm text-green-500">Expires in 61-90 days</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Approaching Expiry Items</h2>
          <div className="flex gap-4">
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="15">Next 15 Days</option>
              <option value="30">Next 30 Days</option>
              <option value="60">Next 60 Days</option>
              <option value="90">Next 90 Days</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredBatches.length === 0 ? (
          <div className="bg-gray-50 p-6 text-center rounded-lg border border-dashed">
            <p className="text-gray-500">
              No items expiring within the selected timeframe
            </p>
          </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Item Name</th>
                <th className="px-4 py-2 text-left">Batch Number</th>
                <th className="px-4 py-2 text-left">Expiry Date</th>
                <th className="px-4 py-2 text-left">Days Left</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches
                .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
                .map((batch) => {
                  const expiryDate = new Date(batch.expiryDate);
                  const today = new Date();
                  const diffTime = expiryDate - today;
                  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  // For each batch, create rows for each item in that batch
                  return batch.expandedItems.map((item, index) => {
                    const category = categories.find(
                      (c) => c.id === item.categoryId
                    );

                    return (
                      <tr
                        key={`${batch.batchNumber}-${item.itemId}`}
                        className={`
                            border-t
                            ${
                              daysLeft <= 15
                                ? "bg-red-50"
                                : daysLeft <= 30
                                ? "bg-yellow-50"
                                : ""
                            }
                          `}
                      >
                        <td className="px-4 py-3">{item.itemName}</td>
                        <td className="px-4 py-3">{batch.batchNumber}</td>
                        <td className="px-4 py-3">{batch.expiryDate}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`
                              font-medium
                              ${
                                daysLeft <= 15
                                  ? "text-red-600"
                                  : daysLeft <= 30
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                              }
                            `}
                          >
                            {daysLeft} days
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-1 rounded-full text-xs"
                            style={{
                              backgroundColor: category?.color + "20",
                              color: category?.color,
                            }}
                          >
                            {category?.name || "Unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-500 hover:text-blue-700">
                            View Item
                          </button>
                        </td>
                      </tr>
                    );
                  });
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpiryDashboard;
