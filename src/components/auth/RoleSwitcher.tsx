import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const RoleSwitcher = () => {
  const { currentUser, switchUser, users } = useAuth();

  if (!currentUser) return null;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "storekeeper":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pharmacist":
        return "bg-green-100 text-green-800 border-green-300";
      case "staff":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={currentUser.id}
        onValueChange={switchUser}
      >
        <SelectTrigger className="w-max">
          <SelectValue>
            <div className="flex items-center">
              <span>{currentUser.name}</span>
              <Badge className={`ml-2 ${getRoleBadgeColor(currentUser.role)}`}>
                {currentUser.role}
              </Badge>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem
              key={user.id}
              value={user.id}
            >
              <div className="flex items-center justify-between w-full">
                <span>{user.name}</span>
                <Badge className={getRoleBadgeColor(user.role)}>
                  {user.role}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
