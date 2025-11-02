"use client";

import { useState, useEffect } from "react";
import { Task } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Wifi, WifiOff } from "lucide-react";

type CollaboratorStatus = {
  id: string;
  name: string;
  color: string;
  lastActive: Date;
  currentTask?: string;
};

type RealTimeCollaborationProps = {
  tasks: Task[];
};

export default function RealTimeCollaboration({
  tasks,
}: RealTimeCollaborationProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [collaborators, setCollaborators] = useState<CollaboratorStatus[]>([]);

  useEffect(() => {
    // Simulate real time collaboration
    const mockCollaborators: CollaboratorStatus[] = [
      { id: "1", name: "You", color: "#3b82f6", lastActive: new Date() },
      {
        id: "2",
        name: "Sarah",
        color: "#10b981",
        lastActive: new Date(Date.now() - 30000),
      },
      {
        id: "3",
        name: "Mike",
        color: "#f59e0b",
        lastActive: new Date(Date.now() - 120000),
      },
    ];

    setCollaborators(mockCollaborators);

    // Simulate online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getActiveStatus = (lastActive: Date) => {
    const diff = Date.now() - lastActive.getTime();
    if (diff < 60000) return "Active now";
    if (diff < 300000) return "Active recently";
    return "Away";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Activity
          </span>
          <Badge
            variant={isOnline ? "default" : "secondary"}
            className="flex items-center gap-1"
          >
            {isOnline ? (
              <Wifi className="h-3 w-3" />
            ) : (
              <WifiOff className="h-3 w-3" />
            )}
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 overflow-hidden">
        {collaborators.map((collab) => (
          <div key={collab.id} className="flex items-center gap-3">
            <Avatar
              className="h-8 w-8"
              style={{ backgroundColor: collab.color }}
            >
              <AvatarFallback className="text-white text-xs">
                {getInitials(collab.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{collab.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {getActiveStatus(collab.lastActive)}
              </div>
            </div>
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: collab.color,
                opacity:
                  Date.now() - collab.lastActive.getTime() < 60000 ? 1 : 0.3,
              }}
            />
          </div>
        ))}

        {isOnline && (
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Changes sync automatically across all devices
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
