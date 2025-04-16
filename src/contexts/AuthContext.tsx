import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

// Define user roles
export type UserRole = "admin" | "storekeeper" | "pharmacist" | "staff";

// Define permissions for each action
export type Permission =
  | "view_inventory"
  | "modify_inventory"
  | "approve_orders"
  | "create_orders"
  | "view_reports";

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

// Sample users for demonstration
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Emmanuel Oyeleke",
    role: "admin",
    email: "admin@hospital.com",
  },
  {
    id: "2",
    name: "Chmapion Lion",
    role: "storekeeper",
    email: "store@hospital.com",
  },
  {
    id: "3",
    name: "Opeyemi Ayeola",
    role: "pharmacist",
    email: "pharmacy@hospital.com",
  },
  { id: "4", name: "Daniel Chi", role: "staff", email: "staff@hospital.com" },
];

// Permission mapping for each role
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    "view_inventory",
    "modify_inventory",
    "approve_orders",
    "create_orders",
    "view_reports",
  ],
  storekeeper: [
    "view_inventory",
    "modify_inventory",
    "approve_orders",
    "create_orders",
    "view_reports",
  ],
  pharmacist: [
    "view_inventory",
    "modify_inventory",
    "create_orders",
    "view_reports",
  ],
  staff: ["view_inventory", "create_orders"],
};

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  switchUser: (userId: string) => void;
  users: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(sampleUsers[0]); // Admin by default

  const login = (email: string, password: string) => {
    // In a real app, you would validate credentials here
    const user = sampleUsers.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      toast.success(`Logged in as ${user.name} (${user.role})`);
    } else {
      toast.error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    toast.info("Logged out successfully");
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!currentUser) return false;
    return rolePermissions[currentUser.role].includes(permission);
  };

  const switchUser = (userId: string) => {
    const user = sampleUsers.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      toast.success(`Switched to ${user.name} (${user.role})`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        hasPermission,
        switchUser,
        users: sampleUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
