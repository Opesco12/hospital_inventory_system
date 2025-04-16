export type OrderItem = {
  itemName: string;
  itemId?: string;
  quantity: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  requestedBy: string;
  purpose: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  approvedBy?: string;
  rejectedBy?: string;
  updatedAt?: string;
};

// Sample data
export const sampleOrders: Order[] = [
  {
    id: "1",
    items: [
      { itemId: "med004", itemName: "Aspirin", quantity: 96 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 290 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 193 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "Emergency supplies",
    status: "approved",
    date: "2025-04-08",
  },
  {
    id: "2",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 264 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 88 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 184 },
    ],
    requestedBy: "Dr. Chen",
    purpose: "COVID-19 ward supplies",
    status: "pending",
    date: "2025-03-22",
  },
  {
    id: "3",
    items: [
      { itemId: "med004", itemName: "Aspirin", quantity: 282 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 251 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 264 },
    ],
    requestedBy: "Dr. Adams",
    purpose: "Surgery preparation",
    status: "pending",
    date: "2024-10-11",
  },
  {
    id: "4",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 249 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 213 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 33 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "Cardiology department",
    status: "pending",
    date: "2024-11-20",
  },
  {
    id: "5",
    items: [
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 175 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 35 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "COVID-19 ward supplies",
    status: "approved",
    date: "2025-03-19",
  },
  {
    id: "6",
    items: [{ itemId: "med004", itemName: "Aspirin", quantity: 276 }],
    requestedBy: "Nurse Johnson",
    purpose: "Surgery preparation",
    status: "pending",
    date: "2024-10-05",
  },
  {
    id: "7",
    items: [
      { itemId: "med001", itemName: "Paracetamol", quantity: 269 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 192 },
    ],
    requestedBy: "Dr. Adams",
    purpose: "Emergency supplies",
    status: "pending",
    date: "2025-02-23",
  },
  {
    id: "8",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 139 },
      { itemId: "med004", itemName: "Aspirin", quantity: 95 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 99 },
    ],
    requestedBy: "Dr. Smith",
    purpose: "Emergency supplies",
    status: "pending",
    date: "2025-02-20",
  },
  {
    id: "9",
    items: [
      { itemId: "med002", itemName: "Amoxicillin", quantity: 55 },
      { itemId: "med004", itemName: "Aspirin", quantity: 101 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 191 },
    ],
    requestedBy: "Dr. Smith",
    purpose: "Emergency supplies",
    status: "rejected",
    date: "2024-11-10",
  },
  {
    id: "10",
    items: [
      { itemId: "med001", itemName: "Paracetamol", quantity: 70 },
      { itemId: "med004", itemName: "Aspirin", quantity: 239 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 219 },
    ],
    requestedBy: "Dr. Smith",
    purpose: "Surgery preparation",
    status: "pending",
    date: "2025-02-04",
  },
  {
    id: "11",
    items: [
      { itemId: "med001", itemName: "Paracetamol", quantity: 235 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 73 },
    ],
    requestedBy: "Nurse Lee",
    purpose: "Emergency supplies",
    status: "rejected",
    date: "2025-03-02",
  },
  {
    id: "12",
    items: [{ itemId: "med003", itemName: "Ibuprofen", quantity: 251 }],
    requestedBy: "Dr. Chen",
    purpose: "Cardiology department",
    status: "approved",
    date: "2024-11-10",
  },
  {
    id: "13",
    items: [
      { itemId: "med004", itemName: "Aspirin", quantity: 200 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 225 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 35 },
    ],
    requestedBy: "Dr. Smith",
    purpose: "Cardiology department",
    status: "pending",
    date: "2024-12-24",
  },
  {
    id: "14",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 113 },
      { itemId: "med004", itemName: "Aspirin", quantity: 201 },
    ],
    requestedBy: "Dr. Smith",
    purpose: "General ward usage",
    status: "rejected",
    date: "2024-12-21",
  },
  {
    id: "15",
    items: [
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 57 },
      { itemId: "med004", itemName: "Aspirin", quantity: 89 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "Surgery preparation",
    status: "approved",
    date: "2024-11-06",
  },
  {
    id: "16",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 105 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 82 },
    ],
    requestedBy: "Dr. Adams",
    purpose: "Surgery preparation",
    status: "rejected",
    date: "2024-12-10",
  },
  {
    id: "17",
    items: [
      { itemId: "med001", itemName: "Paracetamol", quantity: 228 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 220 },
    ],
    requestedBy: "Dr. Chen",
    purpose: "COVID-19 ward supplies",
    status: "approved",
    date: "2025-03-13",
  },
  {
    id: "18",
    items: [
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 51 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 56 },
    ],
    requestedBy: "Nurse Lee",
    purpose: "General ward usage",
    status: "approved",
    date: "2025-01-13",
  },
  {
    id: "19",
    items: [{ itemId: "med002", itemName: "Amoxicillin", quantity: 124 }],
    requestedBy: "Dr. Chen",
    purpose: "COVID-19 ward supplies",
    status: "rejected",
    date: "2024-12-17",
  },
  {
    id: "20",
    items: [
      { itemId: "med002", itemName: "Amoxicillin", quantity: 259 },
      { itemId: "med004", itemName: "Aspirin", quantity: 28 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 10 },
    ],
    requestedBy: "Dr. Adams",
    purpose: "Emergency supplies",
    status: "approved",
    date: "2025-03-14",
  },
  {
    id: "21",
    items: [
      { itemId: "med001", itemName: "Paracetamol", quantity: 167 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 199 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "Cardiology department",
    status: "rejected",
    date: "2024-11-01",
  },
  {
    id: "22",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 245 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 285 },
    ],
    requestedBy: "Nurse Lee",
    purpose: "Surgery preparation",
    status: "rejected",
    date: "2025-04-08",
  },
  {
    id: "23",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 44 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 118 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "Emergency supplies",
    status: "rejected",
    date: "2025-01-06",
  },
  {
    id: "24",
    items: [
      { itemId: "med002", itemName: "Amoxicillin", quantity: 289 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 137 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 261 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "COVID-19 ward supplies",
    status: "rejected",
    date: "2024-12-29",
  },
  {
    id: "25",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 196 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 100 },
    ],
    requestedBy: "Dr. Adams",
    purpose: "General ward usage",
    status: "rejected",
    date: "2024-11-26",
  },
  {
    id: "26",
    items: [{ itemId: "med004", itemName: "Aspirin", quantity: 223 }],
    requestedBy: "Dr. Smith",
    purpose: "COVID-19 ward supplies",
    status: "pending",
    date: "2024-10-04",
  },
  {
    id: "27",
    items: [
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 180 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 37 },
      { itemId: "med004", itemName: "Aspirin", quantity: 74 },
    ],
    requestedBy: "Nurse Lee",
    purpose: "COVID-19 ward supplies",
    status: "approved",
    date: "2024-10-30",
  },
  {
    id: "28",
    items: [
      { itemId: "med004", itemName: "Aspirin", quantity: 295 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 189 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 52 },
    ],
    requestedBy: "Nurse Lee",
    purpose: "Emergency supplies",
    status: "rejected",
    date: "2025-01-14",
  },
  {
    id: "29",
    items: [{ itemId: "med005", itemName: "Ciprofloxacin", quantity: 247 }],
    requestedBy: "Nurse Johnson",
    purpose: "COVID-19 ward supplies",
    status: "pending",
    date: "2025-01-03",
  },
  {
    id: "30",
    items: [
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 93 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 86 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 49 },
    ],
    requestedBy: "Dr. Adams",
    purpose: "Emergency supplies",
    status: "approved",
    date: "2024-10-22",
  },
  {
    id: "31",
    items: [
      { itemId: "med004", itemName: "Aspirin", quantity: 170 },
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 13 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "Emergency supplies",
    status: "pending",
    date: "2025-03-11",
  },
  {
    id: "32",
    items: [
      { itemId: "med004", itemName: "Aspirin", quantity: 255 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 108 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 36 },
    ],
    requestedBy: "Nurse Lee",
    purpose: "General ward usage",
    status: "approved",
    date: "2025-01-10",
  },
  {
    id: "33",
    items: [
      { itemId: "med001", itemName: "Paracetamol", quantity: 151 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 57 },
    ],
    requestedBy: "Nurse Lee",
    purpose: "Surgery preparation",
    status: "rejected",
    date: "2025-04-08",
  },
  {
    id: "34",
    items: [
      { itemId: "med005", itemName: "Ciprofloxacin", quantity: 122 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 45 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 298 },
    ],
    requestedBy: "Nurse Lee",
    purpose: "Cardiology department",
    status: "pending",
    date: "2025-01-03",
  },
  {
    id: "35",
    items: [{ itemId: "med004", itemName: "Aspirin", quantity: 131 }],
    requestedBy: "Dr. Adams",
    purpose: "Surgery preparation",
    status: "approved",
    date: "2025-01-19",
  },
  {
    id: "36",
    items: [
      { itemId: "med002", itemName: "Amoxicillin", quantity: 64 },
      { itemId: "med001", itemName: "Paracetamol", quantity: 93 },
    ],
    requestedBy: "Dr. Chen",
    purpose: "Cardiology department",
    status: "rejected",
    date: "2025-03-29",
  },
  {
    id: "37",
    items: [{ itemId: "med001", itemName: "Paracetamol", quantity: 11 }],
    requestedBy: "Nurse Lee",
    purpose: "COVID-19 ward supplies",
    status: "pending",
    date: "2024-12-03",
  },
  {
    id: "38",
    items: [
      { itemId: "med002", itemName: "Amoxicillin", quantity: 268 },
      { itemId: "med004", itemName: "Aspirin", quantity: 83 },
    ],
    requestedBy: "Nurse Johnson",
    purpose: "General ward usage",
    status: "approved",
    date: "2025-02-28",
  },
  {
    id: "39",
    items: [
      { itemId: "med003", itemName: "Ibuprofen", quantity: 21 },
      { itemId: "med002", itemName: "Amoxicillin", quantity: 96 },
    ],
    requestedBy: "Dr. Smith",
    purpose: "Emergency supplies",
    status: "pending",
    date: "2025-02-02",
  },
  {
    id: "40",
    items: [
      { itemId: "med004", itemName: "Aspirin", quantity: 72 },
      { itemId: "med003", itemName: "Ibuprofen", quantity: 75 },
    ],
    requestedBy: "Dr. Chen",
    purpose: "General ward usage",
    status: "approved",
    date: "2024-10-14",
  },
];
