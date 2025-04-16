
import React, { ReactNode } from 'react';
import { useAuth, Permission } from '@/contexts/AuthContext';

interface RequirePermissionProps {
  permission: Permission | Permission[];
  children: ReactNode;
  fallback?: ReactNode;
}

export const RequirePermission: React.FC<RequirePermissionProps> = ({ 
  permission, 
  children, 
  fallback 
}) => {
  const { hasPermission } = useAuth();
  
  // Handle array of permissions (check if user has any of the listed permissions)
  const hasRequiredPermission = Array.isArray(permission)
    ? permission.some(p => hasPermission(p))
    : hasPermission(permission);
  
  if (hasRequiredPermission) {
    return <>{children}</>;
  }
  
  return fallback ? <>{fallback}</> : null;
};
