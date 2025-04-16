import { InventoryItem, Batch, Category } from "../types/inventory";

export const units: string[] = [
  "Units",
  "Capsules",
  "Pills",
  "Tablets",
  "Rolls",
  "Pieces",
  "Pairs",
];

export const BASE_CATEGORIES: Omit<Category, "itemCount">[] = [
  {
    id: "1",
    name: "Medications",
    description: "All pharmaceutical products and medications",
    color: "#0EA5E9",
    requiresExpiryTracking: true,
  },
  {
    id: "2",
    name: "Supplies",
    description: "General medical supplies and consumables",
    color: "#22C55E",
    requiresExpiryTracking: true,
  },
  {
    id: "3",
    name: "Equipment",
    description: "Medical equipment and devices",
    color: "#8B5CF6",
    requiresExpiryTracking: false,
  },
  {
    id: "4",
    name: "PPE",
    description: "Personal protective equipment",
    color: "#EC4899",
    requiresExpiryTracking: true,
  },
  {
    id: "5",
    name: "Lab",
    description: "Laboratory supplies and equipment",
    color: "#F59E0B",
    requiresExpiryTracking: true,
  },
  {
    id: "6",
    name: "Diagnostics",
    description: "Testing kits, reagents, and diagnostic consumables",
    color: "#EF4444", // Red
    requiresExpiryTracking: true,
  },
  {
    id: "7",
    name: "Surgical",
    description: "Surgical instruments, sutures, and procedure-specific items",
    color: "#3B82F6", // Blue
    requiresExpiryTracking: true,
  },
  {
    id: "8",
    name: "Nutrition",
    description: "Nutritional supplements, feeding tubes, and related supplies",
    color: "#10B981", // Green
    requiresExpiryTracking: true,
  },
  {
    id: "9",
    name: "Linen",
    description: "Bedding, patient gowns, towels, and other textile items",
    color: "#6366F1", // Indigo
    requiresExpiryTracking: false,
  },
  {
    id: "10",
    name: "Cleaning",
    description: "Disinfectants, sanitizers, and cleaning supplies",
    color: "#14B8A6", // Teal
    requiresExpiryTracking: true,
  },
];

// Base mockItems without quantities - quantities will be calculated
export const mockItemsBase: Omit<InventoryItem, "quantity">[] = [
  // Medications
  {
    id: "med001",
    name: "Paracetamol",
    categoryId: "1",
    unit: "Pills",
    batchIds: ["PCM20240210", "PCM20240603"],
  },
  {
    id: "med002",
    name: "Amoxicillin",
    categoryId: "1",
    unit: "Capsules",
    batchIds: ["AMX20231128", "AMX20240415"],
  },
  {
    id: "med003",
    name: "Ibuprofen",
    categoryId: "1",
    unit: "Tablets",
    batchIds: ["IBP20240118"],
  },
  {
    id: "med004",
    name: "Aspirin",
    categoryId: "1",
    unit: "Tablets",
    batchIds: ["ASP20231010", "ASP20240325"],
  },
  {
    id: "med005",
    name: "Ciprofloxacin",
    categoryId: "1",
    unit: "Tablets",
    batchIds: ["CPX20240220"],
  },
  {
    id: "med006",
    name: "Loratadine",
    categoryId: "1",
    unit: "Tablets",
    batchIds: ["LRT20240105"],
  },
  {
    id: "med007",
    name: "Prednisone",
    categoryId: "1",
    unit: "Tablets",
    batchIds: ["PRD20240312"],
  },

  // Supplies
  {
    id: "sup001",
    name: "Bandages",
    categoryId: "2",
    unit: "Rolls",
    batchIds: ["BND20240220"],
  },
  {
    id: "sup002",
    name: "Gauze Pads",
    categoryId: "2",
    unit: "Pieces",
    batchIds: ["GZP20240110"],
  },
  {
    id: "sup003",
    name: "Adhesive Tape",
    categoryId: "2",
    unit: "Rolls",
    batchIds: ["ADT20240315"],
  },
  {
    id: "sup004",
    name: "Disposable Syringes",
    categoryId: "2",
    unit: "Pieces",
    batchIds: ["SYR20240228"],
  },

  // PPE
  {
    id: "ppe001",
    name: "N95 Respirator Masks",
    categoryId: "4",
    unit: "Pieces",
    batchIds: ["N95A20240205", "N95B20240412"],
  },
  {
    id: "ppe002",
    name: "Surgical Masks",
    categoryId: "4",
    unit: "Pieces",
    batchIds: ["SRGM20240115"],
  },
  {
    id: "ppe003",
    name: "Face Shields",
    categoryId: "4",
    unit: "Units",
    batchIds: ["FSH20240320"],
  },
  {
    id: "ppe004",
    name: "Disposable Gloves (S)",
    categoryId: "4",
    unit: "Pairs",
    batchIds: ["GLVS20240210"],
  },
  {
    id: "ppe005",
    name: "Disposable Gloves (M)",
    categoryId: "4",
    unit: "Pairs",
    batchIds: ["GLVM20240210"],
  },
];

export const mockBatches: Batch[] = [
  // Medication Batches
  {
    batchNumber: "PCM20240210",
    expiryDate: "2025-04-20", // 0-15 days from 2025-04-10
    manufacturingDate: "2024-02-10",
    supplier: "PharmaCorp Ltd",
    receiptDate: "2024-02-15",
    items: [{ itemId: "med001", quantity: 61 }],
  },
  {
    batchNumber: "PCM20240603",
    expiryDate: "2026-06-03",
    manufacturingDate: "2024-06-03",
    supplier: "MediSupply Inc",
    receiptDate: "2024-06-10",
    items: [{ itemId: "med001", quantity: 40 }],
  },
  {
    batchNumber: "AMX20231128",
    expiryDate: "2025-05-05", // 16–30 days from 2025-04-10
    manufacturingDate: "2023-11-28",
    supplier: "GeneriPharm",
    receiptDate: "2023-12-05",
    items: [{ itemId: "med002", quantity: 25 }],
  },
  {
    batchNumber: "AMX20240415",
    expiryDate: "2026-04-15",
    manufacturingDate: "2024-04-15",
    supplier: "PharmaCorp Ltd",
    receiptDate: "2024-04-25",
    items: [{ itemId: "med002", quantity: 50 }],
  },
  {
    batchNumber: "IBP20240118",
    expiryDate: "2026-01-18",
    manufacturingDate: "2024-01-18",
    supplier: "MediSupply Inc",
    receiptDate: "2024-01-22",
    items: [{ itemId: "med003", quantity: 120 }],
  },
  {
    batchNumber: "ASP20231010",
    expiryDate: "2025-05-20", // 31–60 days from 2025-04-10
    manufacturingDate: "2023-10-10",
    supplier: "GeneriPharm",
    receiptDate: "2023-10-17",
    items: [{ itemId: "med004", quantity: 100 }],
  },
  {
    batchNumber: "ASP20240325",
    expiryDate: "2026-03-25",
    manufacturingDate: "2024-03-25",
    supplier: "PharmaCorp Ltd",
    receiptDate: "2024-04-02",
    items: [{ itemId: "med004", quantity: 100 }],
  },
  {
    batchNumber: "CPX20240220",
    expiryDate: "2026-02-20",
    manufacturingDate: "2024-02-20",
    supplier: "MediSupply Inc",
    receiptDate: "2024-02-28",
    items: [{ itemId: "med005", quantity: 45 }],
  },
  {
    batchNumber: "LRT20240105",
    expiryDate: "2026-01-05",
    manufacturingDate: "2024-01-05",
    supplier: "GeneriPharm",
    receiptDate: "2024-01-15",
    items: [{ itemId: "med006", quantity: 60 }],
  },
  {
    batchNumber: "PRD20240312",
    expiryDate: "2026-03-12",
    manufacturingDate: "2024-03-12",
    supplier: "PharmaCorp Ltd",
    receiptDate: "2024-03-20",
    items: [{ itemId: "med007", quantity: 30 }],
  },

  // Supply Batches
  {
    batchNumber: "BND20240220",
    expiryDate: "2027-02-20",
    manufacturingDate: "2024-02-20",
    supplier: "MedSupplies Ltd",
    receiptDate: "2024-02-25",
    items: [{ itemId: "sup001", quantity: 20 }],
  },
  {
    batchNumber: "GZP20240110",
    expiryDate: "2025-06-15", // 61–90 days from 2025-04-10
    manufacturingDate: "2024-01-10",
    supplier: "MedSupplies Ltd",
    receiptDate: "2024-01-20",
    items: [{ itemId: "sup002", quantity: 150 }],
  },
  {
    batchNumber: "ADT20240315",
    expiryDate: "2027-03-15",
    manufacturingDate: "2024-03-15",
    supplier: "MedSupplies Ltd",
    receiptDate: "2024-03-22",
    items: [{ itemId: "sup003", quantity: 35 }],
  },
  {
    batchNumber: "SYR20240228",
    expiryDate: "2027-02-28",
    manufacturingDate: "2024-02-28",
    supplier: "MediEquip Inc",
    receiptDate: "2024-03-05",
    items: [{ itemId: "sup004", quantity: 200 }],
  },

  // PPE Batches
  {
    batchNumber: "N95A20240205",
    expiryDate: "2027-02-05",
    manufacturingDate: "2024-02-05",
    supplier: "SafetyFirst Ltd",
    receiptDate: "2024-02-15",
    items: [{ itemId: "ppe001", quantity: 300 }],
  },
  {
    batchNumber: "N95B20240412",
    expiryDate: "2027-04-12",
    manufacturingDate: "2024-04-12",
    supplier: "SafetyFirst Ltd",
    receiptDate: "2024-04-20",
    items: [{ itemId: "ppe001", quantity: 200 }],
  },
  {
    batchNumber: "SRGM20240115",
    expiryDate: "2027-01-15",
    manufacturingDate: "2024-01-15",
    supplier: "MediProtect",
    receiptDate: "2024-01-25",
    items: [{ itemId: "ppe002", quantity: 1000 }],
  },
  {
    batchNumber: "FSH20240320",
    expiryDate: "2029-03-20",
    manufacturingDate: "2024-03-20",
    supplier: "SafetyFirst Ltd",
    receiptDate: "2024-03-28",
    items: [{ itemId: "ppe003", quantity: 75 }],
  },
  {
    batchNumber: "GLVS20240210",
    expiryDate: "2027-02-10",
    manufacturingDate: "2024-02-10",
    supplier: "MediProtect",
    receiptDate: "2024-02-18",
    items: [{ itemId: "ppe004", quantity: 800 }],
  },
  {
    batchNumber: "GLVM20240210",
    expiryDate: "2027-02-10",
    manufacturingDate: "2024-02-10",
    supplier: "MediProtect",
    receiptDate: "2024-02-18",
    items: [{ itemId: "ppe005", quantity: 1200 }],
  },
];

// Function to calculate quantities from batches

// Generate the final mockItems with calculated quantities
// export const mockItems: InventoryItem[] = calculateItemQuantities(
//   mockItemsBase,
//   mockBatches
// );
