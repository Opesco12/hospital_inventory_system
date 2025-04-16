import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { Package, ShoppingCart, Database, FileText } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

const recentActivities = [
  {
    id: "1",
    action: "added 50 units of",
    item: "Surgical Masks",
    user: "Dr. Chen",
    time: "10 min ago",
    type: "added" as const,
  },
  {
    id: "2",
    action: "updated quantity for",
    item: "Blood Pressure Cuffs",
    user: "Nurse Johnson",
    time: "1 hour ago",
    type: "updated" as const,
  },
  {
    id: "3",
    action: "ordered 100 units of",
    item: "Disposable Syringes",
    user: "Dr. Williams",
    time: "2 hours ago",
    type: "ordered" as const,
  },
  {
    id: "4",
    action: "removed 5 units of",
    item: "Patient Monitors",
    user: "Tech Support",
    time: "3 hours ago",
    type: "removed" as const,
  },
];

const Dashboard = () => {
  const { items, categories } = useInventory();

  const chartData = categories.map((category) => ({
    name: category.name,
    value: category.itemCount,
    color: category.color,
  }));

  function getTotalQuantity(items: InventoryItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  function countLowStockItems(items: InventoryItem[]): number {
    return items.filter((item) => item.quantity < 40).length;
  }
  return (
    <PageContainer title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Inventory"
          value={getTotalQuantity(items)}
          icon={<Package size={24} />}
          change="2.5% ↑"
          trend="up"
        />
        <StatsCard
          title="Categories"
          value={categories?.length}
          icon={<Database size={24} />}
          change="No change"
          trend="neutral"
        />
        <StatsCard
          title="Pending Requests"
          value="8"
          icon={<ShoppingCart size={24} />}
          change="12% ↓"
          trend="down"
        />
        <StatsCard
          title="Low Stock Items"
          value={countLowStockItems(items)}
          icon={<FileText size={24} />}
          change="3 new"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <InventoryChart data={chartData} />
        </div>
        <div>
          <LowStockAlert />
        </div>
      </div>

      <div>
        <RecentActivity activities={recentActivities} />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
