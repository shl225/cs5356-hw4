"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// displaying tasks with optional category filter
// second sentence We pass tasks to TaskItem for final rendering
export default function TaskList({
  tasks,
  categories,
  onToggleComplete,
  onDelete,
  onRenameTask,
  onUpdateTaskCategory,
  onUpdateTaskDueDate,
}) {
  const [filter, setFilter] = useState("all");

  // filtering tasks by category
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.category === filter);

  // building unique set of categories from tasks
  const usedCategories = Array.from(new Set(tasks.map((t) => t.category)));

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="categoryFilter">Filter by Category:</Label>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48" id="categoryFilter" type="button">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {usedCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ul className="space-y-2 mt-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            categories={categories}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onRenameTask={onRenameTask}
            onUpdateTaskCategory={onUpdateTaskCategory}
            onUpdateTaskDueDate={onUpdateTaskDueDate}
          />
        ))}
      </ul>
    </div>
  );
}
