"use client";

import { Card, CardContent } from "@/components/ui/card";

const TaskStats = ({ tasks }) => {
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;

  return (
    <Card>
      <CardContent className="p-4 flex justify-between">
        <span>Total: {tasks.length}</span>
        <span className="text-green-600">Completed: {completed}</span>
        <span className="text-red-600">Remaining: {remaining}</span>
      </CardContent>
    </Card>
  );
};

export default TaskStats;
