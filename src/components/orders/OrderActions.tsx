
import React from 'react';
import { Button } from '@/components/ui/button';
import { RequirePermission } from '@/components/auth/RequirePermission';
import { Order } from '@/types/orders';

interface OrderActionsProps {
  order: Order;
  onUpdateStatus: (id: string, newStatus: Order['status']) => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({ order, onUpdateStatus }) => {
  if (order.status !== 'pending') {
    return null;
  }

  return (
    <RequirePermission 
      permission={['approve_orders']} 
      fallback={<span className="text-sm text-gray-500">No permission</span>}
    >
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-green-500" 
          onClick={() => onUpdateStatus(order.id, 'approved')}
        >
          Approve
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-500"
          onClick={() => onUpdateStatus(order.id, 'rejected')}
        >
          Reject
        </Button>
      </div>
    </RequirePermission>
  );
};
