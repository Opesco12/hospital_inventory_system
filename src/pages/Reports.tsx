import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Calendar,
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import { useInventory } from "@/contexts/InventoryContext";
import { getMonthlyOrderSummary, getMostOrderedItems } from "@/utils/orders";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import ExpiryDashboard from "@/components/reports/ExpiryDashboard";

const inventoryData = [
  { month: "Jan", totalItems: 120, lowStock: 5, expired: 2 },
  { month: "Feb", totalItems: 150, lowStock: 8, expired: 3 },
  { month: "Mar", totalItems: 180, lowStock: 12, expired: 4 },
  { month: "Apr", totalItems: 220, lowStock: 10, expired: 6 },
  { month: "May", totalItems: 200, lowStock: 15, expired: 5 },
  { month: "Jun", totalItems: 250, lowStock: 20, expired: 7 },
];

const orderData = [
  { month: "Jan", approved: 45, rejected: 5, pending: 10 },
  { month: "Feb", approved: 50, rejected: 8, pending: 12 },
  { month: "Mar", approved: 65, rejected: 10, pending: 15 },
  { month: "Apr", approved: 70, rejected: 12, pending: 18 },
  { month: "May", approved: 80, rejected: 15, pending: 20 },
  { month: "Jun", approved: 90, rejected: 10, pending: 15 },
];

const categoryData = [
  { name: "Antibiotics", value: 35 },
  { name: "Painkillers", value: 25 },
  { name: "Vitamins", value: 15 },
  { name: "Medical Supplies", value: 10 },
  { name: "Other", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Reports = () => {
  const [timeRange, setTimeRange] = useState("last6Months");

  const { categories } = useInventory();

  const { orders } = useInventory();
  const monthlyOrderData = getMonthlyOrderSummary(orders);
  const mostOrderedItems = getMostOrderedItems(orders).slice(0, 5);

  const chartData = categories.map((category) => ({
    name: category.name,
    value: category.itemCount,
    color: category.color,
  }));

  return (
    <PageContainer title="Reports">
      <div className="mb-6 flex items-center justify-between">
        <div className="w-48">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30Days">Last 30 days</SelectItem>
              <SelectItem value="last3Months">Last 3 months</SelectItem>
              <SelectItem value="last6Months">Last 6 months</SelectItem>
              <SelectItem value="lastYear">Last year</SelectItem>
              <SelectItem value="allTime">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </div>

      <Tabs
        defaultValue="inventory"
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger
            value="inventory"
            className="flex items-center gap-2"
          >
            <BarChart size={16} />
            <span>Inventory</span>
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="flex items-center gap-2"
          >
            <LineChart size={16} />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="flex items-center gap-2"
          >
            <PieChart size={16} />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger
            value="expiryDates"
            className="flex items-center gap-2"
          >
            <Calendar size={16} />
            <span>Expiry Dates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>
                Visualize inventory trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={inventoryData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="totalItems"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="lowStock"
                      stackId="2"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                    <Area
                      type="monotone"
                      dataKey="expired"
                      stackId="3"
                      stroke="#ff8042"
                      fill="#ff8042"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Items</CardTitle>
                <CardDescription>
                  Items that need to be restocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <RechartsBarChart
                      data={inventoryData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="lowStock"
                        fill="#ffc658"
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expired Items</CardTitle>
                <CardDescription>
                  Items that have expired over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <RechartsBarChart
                      data={inventoryData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="expired"
                        fill="#ff8042"
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Status Trends</CardTitle>
              <CardDescription>
                Overview of order statuses over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <RechartsBarChart
                    data={monthlyOrderData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="approved"
                      stackId="a"
                      fill="#4ade80"
                    />
                    <Bar
                      dataKey="rejected"
                      stackId="a"
                      fill="#f87171"
                    />
                    <Bar
                      dataKey="pending"
                      stackId="a"
                      fill="#facc15"
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Ordered Items</CardTitle>
                <CardDescription>
                  Top 5 most requested inventory items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <RechartsBarChart
                      layout="vertical"
                      data={mostOrderedItems}
                      margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis
                        dataKey="itemName"
                        type="category"
                        width={150}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="totalQuantity"
                        fill="#4f46e5"
                        name="Quantity Ordered"
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>
                Distribution of inventory items by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  {/* <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart> */}
                  <InventoryChart data={chartData} />
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiryDates">
          <Card>
            <CardContent>
              {/* <div className="rounded-md border">
                <div className="grid grid-cols-4 bg-muted/50 p-3 font-medium">
                  <div>Item Name</div>
                  <div>Category</div>
                  <div>Quantity</div>
                  <div>Expiry Date</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-4 p-3">
                    <div>Paracetamol 500mg</div>
                    <div>Painkillers</div>
                    <div>200 tablets</div>
                    <div className="text-amber-500">July 15, 2025</div>
                  </div>
                  <div className="grid grid-cols-4 p-3">
                    <div>Amoxicillin 250mg</div>
                    <div>Antibiotics</div>
                    <div>150 capsules</div>
                    <div className="text-amber-500">August 2, 2025</div>
                  </div>
                </div>
              </div> */}
              <ExpiryDashboard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Reports;
