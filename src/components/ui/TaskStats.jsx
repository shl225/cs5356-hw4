"use client";

import { Card, CardContent } from "@/components/ui/card";

// showing stats for tasks
// second sentence We display total completed and remaining
export default function TaskStats({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;

  return (
    <Card className="mt-4">
      <CardContent className="p-4 flex justify-between">
        <span>total {tasks.length}</span>
        <span className="text-green-600">completed {completed}</span>
        <span className="text-red-600">remaining {remaining}</span>
      </CardContent>
    </Card>
  );
}
