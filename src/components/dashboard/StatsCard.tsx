
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon,
  change,
  trend = 'neutral',
  className 
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="bg-medical-100 h-12 w-12 rounded-lg flex items-center justify-center text-medical-600">
            {icon}
          </div>
        </div>
      </CardContent>
      {change && (
        <CardFooter className="px-6 py-3 bg-gray-50 border-t">
          <div className="flex items-center">
            {trend === 'up' && <span className="text-green-500 text-xs">↑</span>}
            {trend === 'down' && <span className="text-red-500 text-xs">↓</span>}
            <span className={cn(
              "text-xs font-medium ml-1",
              trend === 'up' && "text-green-600",
              trend === 'down' && "text-red-600",
              trend === 'neutral' && "text-gray-500"
            )}>
              {change} from last month
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
