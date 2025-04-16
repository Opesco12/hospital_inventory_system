
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Database,
  Package,
  ShoppingCart,
  FileText,
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  isCollapsed,
  onClick 
}) => {
  return (
    <Link to={to} onClick={onClick} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-2 mb-1",
          isCollapsed ? "h-12 justify-center p-0" : "h-10",
          isActive && "bg-medical-100 text-medical-800"
        )}
      >
        <Icon size={20} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export const AppSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/inventory", icon: Package, label: "Inventory" },
    { to: "/categories", icon: Database, label: "Categories" },
    { to: "/orders", icon: ShoppingCart, label: "Orders" },
    { to: "/reports", icon: FileText, label: "Reports" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center">
            <Package className="text-medical-500" size={24} />
            <span className="ml-2 font-semibold text-lg">MediInventory</span>
          </div>
        )}
        <Button variant="ghost" size="sm" className="ml-auto" onClick={toggleCollapsed}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      <div className="flex-1 p-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={isActive(item.to)}
            isCollapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );
};
