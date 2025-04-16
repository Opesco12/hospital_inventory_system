
import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '@/types/orders';

interface OrderStatusBadgeProps {
  status: Order['status'];
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  switch(status) {
    case 'pending':
      return <div className="flex items-center"><Clock size={16} className="text-yellow-500 mr-1" /> Pending</div>;
    case 'approved':
      return <div className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-1" /> Approved</div>;
    case 'rejected':
      return <div className="flex items-center"><XCircle size={16} className="text-red-500 mr-1" /> Rejected</div>;
  }
};
