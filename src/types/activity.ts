export interface ActivityItem {
  id: string;
  action: string;
  item: string;
  user: string;
  time: string;
  type: "added" | "removed" | "updated" | "ordered";
}
