import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Plus, X } from "lucide-react";
import { ItemForm } from "@/components/inventory/ItemForm";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { InventoryItem } from "@/types/inventory";
import InventoryTable from "@/components/inventory/InventoryTable";
import { Permission } from "@/contexts/AuthContext";
import { useInventory } from "@/contexts/InventoryContext";

const Inventory = () => {
  // const [items, setItems] = useState<InventoryItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { items, getCategoryById, addItemToInventory } = useInventory();

  const handleOpenForm = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const handleSaveItem = (item: InventoryItem) => {
    console.log(item);
    if (selectedItem) {
      // Update existing item
      // setItems(items.map((i) => (i.id === item.id ? item : i)));
      // toast({ title: "Item updated successfully." });
    } else {
      addItemToInventory(item);
      toast({ title: "Item added successfully." });
    }
    handleCloseForm();
  };

  const handleDeleteItem = (id: string) => {
    //   setItemToDeleteId(id);
    //   setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    //   if (itemToDeleteId) {
    //     setItems(items.filter((item) => item.id !== itemToDeleteId));
    //     toast({ title: "Item deleted successfully." });
    //     setIsDeleteModalOpen(false);
    //     setItemToDeleteId(null);
    //   }
  };

  const handleCancelDelete = () => {
    //   setIsDeleteModalOpen(false);
    //   setItemToDeleteId(null);
  };

  const handleSelectItem = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    //   if (selected) {
    //     setSelectedItems(items.map((item) => item.id));
    //   } else {
    //     setSelectedItems([]);
    //   }
  };

  const inventoryItems = items?.map((item) => ({
    ...item,
    category: getCategoryById(item.categoryId)?.name || "Unknown",
  }));

  const filteredItems = inventoryItems?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer title="Inventory">
      <div className="mb-4 flex items-center justify-between">
        <Input
          type="search"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
        {/* <RequirePermission permission={["create_inventory"] as Permission[]}> */}
        <Button
          onClick={handleOpenForm}
          className="space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </Button>
        {/* </RequirePermission> */}
      </div>

      <InventoryTable
        items={filteredItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
      />

      {/* Modal Overlay with Blur Effect */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={handleCloseForm}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            {/* Close Button */}
            <button
              onClick={handleCloseForm}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Form Title */}
            <h2 className="mb-4 text-lg font-semibold">
              {selectedItem ? "Edit Item" : "Add New Item"}
            </h2>

            {/* Item Form */}
            <ItemForm
              onClose={handleCloseForm}
              item={selectedItem}
              onSave={handleSaveItem}
            />
          </div>
        </div>
      )}

      <AlertDialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete this
              item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel onClick={handleCancelDelete}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
};

export default Inventory;
