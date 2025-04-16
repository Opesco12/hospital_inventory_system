import React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleSwitcher } from "@/components/auth/RoleSwitcher";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { currentUser } = useAuth();

  function getInitials(fullName) {
    const names = fullName.trim().split(" ");
    if (names.length < 2) return "";
    const firstInitial = names[0][0].toUpperCase();
    const lastInitial = names[names.length - 1][0].toUpperCase();
    return firstInitial + lastInitial;
  }

  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex items-center space-x-4">
          <RoleSwitcher />
          <Button
            variant="ghost"
            size="icon"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
            {getInitials(currentUser?.name || "")}
          </div>
        </div>
      </div>
    </header>
  );
};
