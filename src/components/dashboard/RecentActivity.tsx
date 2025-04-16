import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

import { ActivityItem } from "@/types/activity";
import { useInventory } from "@/contexts/InventoryContext";
import { formatTime } from "@/utils/helperFuntions";

export const RecentActivity = ({}) => {
  const { activities } = useInventory();

  const getActivityBadge = (type: ActivityItem["type"]) => {
    switch (type) {
      case "added":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
            Added
          </Badge>
        );
      case "removed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
            Removed
          </Badge>
        );
      case "updated":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
            Updated
          </Badge>
        );
      case "ordered":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">
            Ordered
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Clock
            size={16}
            className="text-medical-500"
          />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 border-b last:border-0"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{activity.item}</p>
                {getActivityBadge(activity.type)}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}
              </p>
            </div>
            <p className="text-xs text-gray-500">{formatTime(activity.time)}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
