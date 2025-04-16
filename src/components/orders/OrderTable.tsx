
import React from 'react';
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from '@/components/ui/table';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderActions } from './OrderActions';
import { Order } from '@/types/orders';

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, newStatus: Order['status']) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, onUpdateStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <ul className="list-disc pl-5">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.itemName} ({item.quantity})
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>{order.requestedBy}</TableCell>
              <TableCell className="max-w-xs truncate">{order.purpose}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell><OrderStatusBadge status={order.status} /></TableCell>
              <TableCell>
                <OrderActions order={order} onUpdateStatus={onUpdateStatus} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
