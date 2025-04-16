import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";

export const LowStockAlert = () => {
  const { items } = useInventory();

  const lowStockItems = items.filter((item) => item.quantity < 40); // 👈 filter for low stock

  const getLevelColor = (current: number, threshold: number) => {
    const ratio = current / threshold;
    if (ratio <= 0.25) return "bg-red-100 text-red-800 border-red-200";
    if (ratio <= 0.5) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <AlertTriangle
            size={16}
            className="text-amber-500"
          />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 divide-y">
        {lowStockItems.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            No items running low
          </div>
        ) : (
          lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={getLevelColor(item.quantity, 100)}
                >
                  {item.quantity}/{100}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
