import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { mockItemsBase, mockBatches, BASE_CATEGORIES } from "./inventory";
import { Order } from "@/types/orders";
import { sampleOrders } from "@/types/orders";
import { InventoryItem, Batch, Category } from "@/types/inventory";
import { calculateItemQuantities } from "@/utils/inventory";
import { ActivityItem } from "@/types/activity";

const InventoryContext = createContext({});

type InventoryContextType = {
  mockItems: InventoryItem[];
  categories: Category[];
  orders: Order[];
  batches: Batch[];
  activities: ActivityItem[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (
    id: string,
    status: Order["status"],
    updatedBy?: string
  ) => void;
  getCategoryById: (id: string) => Category | undefined;
  getItemsByCategory: (categoryId: string) => InventoryItem[];
  addItemToInventory: (newItem: InventoryItem) => void;
  addBatchToInventory: (newBatch: Batch) => void;
};

const InventoryProvider = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  // Add a state for base items without quantities
  const [baseItems, setBaseItems] = useState(mockItemsBase);

  const logActivity = (
    action: string,
    item: string,
    type: ActivityItem["type"],
    user: string = "System" // Default or get from auth context
  ) => {
    const newActivity = {
      id: crypto.randomUUID(), // Generate unique ID
      action,
      item,
      user,
      time: new Date().toISOString(),
      type,
    };

    setActivities((prev) => [newActivity, ...prev].slice(0, 5)); // Keep last 5 activities
  };

  // Initialize baseItems with mockItemsBase
  useEffect(() => {
    setBaseItems(mockItemsBase);
  }, []);

  // Calculate quantities whenever baseItems or batches change
  useEffect(() => {
    const updatedItems = calculateItemQuantities(baseItems, batches);
    setItems(updatedItems);
  }, [baseItems, batches]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    logActivity(
      `placed an order for ${order.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )} items`,
      "New Order",
      "ordered",
      order.requestedBy
    );
  };

  const updateOrderStatus = (
    id: string,
    status: Order["status"],
    updatedBy?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          logActivity(
            `${status} order`,
            order.orderNumber || "Order",
            "updated",
            updatedBy || "System"
          );

          return {
            ...order,
            status,
            ...(updatedBy && (status === "approved" || status === "rejected")
              ? {
                  [status === "approved" ? "approvedBy" : "rejectedBy"]:
                    updatedBy,
                }
              : {}),
            updatedAt: new Date().toISOString(),
          };
        }
        return order;
      })
    );
  };

  const addItemToInventory = (newItem: InventoryItem) => {
    console.log("Trying to add a new item", newItem);

    // Add to baseItems (without quantity)
    const { quantity, ...baseItem } = newItem;
    setBaseItems((prev) => [baseItem, ...prev]);

    // Quantities will be calculated by the effect
    logActivity(`added a new item to inventory`, newItem.name, "added");

    // Check if any existing batches contain this item and associate them
    batches.forEach((batch) => {
      if (batch.items.some((batchItem) => batchItem.itemId === newItem.id)) {
        setBaseItems((prevItems) =>
          prevItems.map((item) =>
            item.id === newItem.id
              ? {
                  ...item,
                  batchIds: [...(item.batchIds || []), batch.batchNumber],
                }
              : item
          )
        );
      }
    });
  };

  const addBatchToInventory = (newBatch: Batch) => {
    console.log("trying to add a new Batch", newBatch);

    setBatches((prevBatches) => [newBatch, ...prevBatches]);

    // Update baseItems with the batch ID
    newBatch.items.forEach((batchItem) => {
      setBaseItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === batchItem.itemId) {
            return {
              ...item,
              batchIds: [...(item.batchIds || []), newBatch.batchNumber],
            };
          }
          return item;
        })
      );
    });

    logActivity(
      `added a new batch with ${newBatch.items.length} item types`,
      `Batch #${newBatch.batchNumber}`,
      "added"
    );
  };

  const categories = useMemo(() => {
    const categoryQuantities: Record<string, number> = {};

    items.forEach((item) => {
      categoryQuantities[item.categoryId] =
        (categoryQuantities[item.categoryId] || 0) + item.quantity;
    });

    return BASE_CATEGORIES.map((category) => ({
      ...category,
      itemCount: categoryQuantities[category.id] || 0,
    }));
  }, [items]);

  const getCategoryById = (id: string): Category | undefined => {
    return categories.find((category) => category.id === id);
  };

  // Helper function to get items by category
  const getItemsByCategory = (categoryId: string): InventoryItem[] => {
    return items.filter((item) => item.categoryId === categoryId);
  };

  const getItemById = (id: string): InventoryItem | undefined => {
    return items.find((item) => item.id === id);
  };

  return (
    <InventoryContext.Provider
      value={{
        items: items,
        categories,
        orders,
        batches: batches,
        activities,
        addOrder,
        updateOrderStatus,
        getCategoryById,
        getItemsByCategory,
        addItemToInventory,
        addBatchToInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("This hook must be used within an Inventory Prodiver");
  }
  return context;
};

export default InventoryProvider;
