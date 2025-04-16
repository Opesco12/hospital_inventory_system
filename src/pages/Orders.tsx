import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Order, OrderItem } from "@/types/orders";
import { OrderTable } from "@/components/orders/OrderTable";
import { CreateOrderModal } from "@/components/orders/CreateOrderModal";
import { useInventory } from "@/contexts/InventoryContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Orders() {
  const { orders, addOrder, updateOrderStatus } = useInventory();
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleUpdateStatus = (id: string, newStatus: Order["status"]) => {
    updateOrderStatus(id, newStatus, currentUser?.name || "System");

    toast({
      title: "Status Updated",
      description: `Request ${id} has been ${newStatus}.`,
    });
  };

  const handleCreateOrder = (
    newItems: Omit<OrderItem, "id">[],
    purpose: string
  ) => {
    const order: Order = {
      id: Date.now().toString(),
      items: newItems.map((item, index) => ({
        id: `item-${index + 1}`,
        itemName: item.itemName,
        quantity: item.quantity,
      })),
      requestedBy: currentUser?.name || "Unknown",
      purpose,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };

    addOrder(order);

    toast({
      title: "Order Created",
      description: "Your order has been submitted successfully.",
    });
  };

  return (
    <PageContainer title="Orders">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Manage inventory orders and requests</p>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <OrderTable
        orders={orders}
        onUpdateStatus={handleUpdateStatus}
      />

      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateOrder={handleCreateOrder}
      />
    </PageContainer>
  );
}
