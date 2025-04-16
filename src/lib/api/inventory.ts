
import { InventoryItem } from "@/types/inventory";

// This is a placeholder for actual API functions
// Replace with real API calls when available

export const createInventoryItem = async (itemData: Omit<InventoryItem, "id">): Promise<InventoryItem> => {
  // Mock implementation - replace with actual API call
  console.log("Creating item:", itemData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate a random ID for the new item
  const newItem = { 
    ...itemData, 
    id: Math.random().toString(36).substring(7) 
  };
  
  return newItem;
};

export const updateInventoryItem = async (itemData: InventoryItem): Promise<InventoryItem> => {
  // Mock implementation - replace with actual API call
  console.log("Updating item:", itemData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return itemData;
};

export const deleteInventoryItem = async (id: string): Promise<void> => {
  // Mock implementation - replace with actual API call
  console.log("Deleting item:", id);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  // Mock implementation - replace with actual API call
  console.log("Fetching inventory items");
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return [
    { id: '1', name: 'Paracetamol', category: 'Medication', quantity: 100, unit: 'Pills' },
    { id: '2', name: 'Bandages', category: 'Supplies', quantity: 50, unit: 'Rolls' },
    { id: '3', name: 'Amoxicillin', category: 'Medication', quantity: 75, unit: 'Capsules' },
  ];
};
