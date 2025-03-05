"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Trash } from "lucide-react";

const TaskItem = ({ task, onToggleComplete, onDelete }) => (
  <li className="flex items-center justify-between p-2 border rounded-md">
    <Button
      variant="ghost"
      onClick={() => onToggleComplete(task.id)}
      aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      className="mr-2"
    >
      {task.completed ? <Check className="text-green-500" /> : "○"}
    </Button>

    <span className={cn("flex-1", task.completed && "line-through text-muted-foreground")}>
      {task.text}
    </span>

    <Button variant="destructive" onClick={() => onDelete(task.id)} aria-label="Delete task">
      <Trash className="h-4 w-4" />
    </Button>
  </li>
);

export default TaskItem;
