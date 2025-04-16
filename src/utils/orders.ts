import { Order } from "@/types/orders";

type MonthlyOrderData = {
  month: string;
  approved: number;
  rejected: number;
  pending: number;
};

export function getMonthlyOrderSummary(orders: Order[]): MonthlyOrderData[] {
  const summary: { [month: string]: MonthlyOrderData } = {};

  orders.forEach((order) => {
    const date = new Date(order.date);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!summary[key]) {
      summary[key] = { month: key, approved: 0, rejected: 0, pending: 0 };
    }

    summary[key][order.status]++;
  });

  // Sort by month (optional but recommended)
  const orderedMonths = Object.values(summary).sort((a, b) =>
    new Date(`1 ${a.month}`) > new Date(`1 ${b.month}`) ? 1 : -1
  );

  return orderedMonths;
}

export function getMostOrderedItems(orders: Order[]) {
  const itemMap: Record<string, { itemName: string; totalQuantity: number }> =
    {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!itemMap[item.itemId]) {
        itemMap[item.itemId] = { itemName: item.itemName, totalQuantity: 0 };
      }
      itemMap[item.itemId].totalQuantity += item.quantity;
    });
  });

  return Object.entries(itemMap)
    .map(([itemId, data]) => ({ itemId, ...data }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity);
}
