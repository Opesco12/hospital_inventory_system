import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface InventoryChartProps {
  data: CategoryData[];
}

export const InventoryChart: React.FC<InventoryChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b pb-3">
        <CardTitle className="text-base font-medium">
          Inventory by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                // labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
