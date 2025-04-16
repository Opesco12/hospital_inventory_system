import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInventory } from "@/contexts/InventoryContext";

interface CreateOrderItemProps {
  itemName: string;
  quantity: number;
  index: number;
  itemId: string;
  onChange: (
    index: number,
    field: "itemName" | "quantity" | "itemId",
    value: any
  ) => void;
  onRemove: (index: number) => void;
}

export const CreateOrderItem: React.FC<CreateOrderItemProps> = ({
  itemName,
  itemId,
  quantity,
  index,
  onChange,
  onRemove,
}) => {
  const { items } = useInventory();

  const selectedItem = items?.find((item) => item.id === itemId);
  const maxQuantity = selectedItem?.quantity || 0;
  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  useEffect(() => {
    onChange(index, "itemName", selectedItem?.name || "");
  }, [selectedItem]);

  return (
    <div className="grid gap-4 p-3 border rounded-md relative">
      <div className="absolute right-2 top-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(index)}
          className="h-6 w-6"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`item-${index}`}>Item</Label>
        <Select
          value={itemId}
          onValueChange={(value) => {
            console.log(value);
            onChange(index, "itemId", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an item" />
          </SelectTrigger>
          <SelectContent>
            {items?.map((invItem) => (
              <SelectItem
                key={invItem?.id}
                value={invItem?.id}
              >
                {invItem?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
        <Select
          value={quantity.toString()}
          onValueChange={(value) =>
            onChange(index, "quantity", parseInt(value))
          }
          // disabled={maxQuantity === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select quantity" />
          </SelectTrigger>
          <SelectContent>
            {quantityOptions.map((num) => (
              <SelectItem
                key={num}
                value={num.toString()}
              >
                {num} {selectedItem?.unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
