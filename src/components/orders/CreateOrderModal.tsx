import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { CreateOrderItem } from "./CreateOrderItem";
import { OrderItem } from "@/types/orders";
import { useToast } from "@/hooks/use-toast";
import { useInventory } from "@/contexts/InventoryContext";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (items: Omit<OrderItem, "id">[], purpose: string) => void;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  onCreateOrder,
}) => {
  const { toast } = useToast();
  const [newOrderItems, setNewOrderItems] = useState<Omit<OrderItem, "id">[]>([
    { itemName: "", itemId: "", quantity: 1 },
  ]);
  const [purpose, setPurpose] = useState("");

  const resetForm = () => {
    setNewOrderItems([{ itemName: "", quantity: 1 }]);
    setPurpose("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const addOrderItem = () => {
    setNewOrderItems([...newOrderItems, { itemName: "", quantity: 1 }]);
  };

  const removeOrderItem = (index: number) => {
    if (newOrderItems.length === 1) {
      toast({
        title: "Cannot Remove",
        description: "Request must have at least one item",
        variant: "destructive",
      });
      return;
    }
    const updatedItems = [...newOrderItems];
    updatedItems.splice(index, 1);
    setNewOrderItems(updatedItems);
  };

  const updateOrderItem = (
    index: number,
    field: keyof Omit<OrderItem, "id">,
    value: any
  ) => {
    const updatedItems = [...newOrderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewOrderItems(updatedItems);
  };

  const handleSubmit = () => {
    // Validate the order
    if (
      newOrderItems.some((item) => !item.itemName || item.quantity <= 0) ||
      !purpose
    ) {
      toast({
        title: "Invalid Input",
        description: "Please fill out all fields with valid values.",
        variant: "destructive",
      });
      return;
    }

    onCreateOrder(newOrderItems, purpose);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {newOrderItems.map((item, index) => (
            <CreateOrderItem
              key={index}
              itemId={item.itemId}
              itemName={item.itemName}
              quantity={item.quantity}
              index={index}
              onChange={updateOrderItem}
              onRemove={removeOrderItem}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={addOrderItem}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Item
          </Button>

          <div className="grid gap-2 mt-4">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="Why are these items needed?"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
