"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Trash, Pencil, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./DatePicker";

// displaying single task item with inline editing
// This includes category dropdown and date editing
export default function TaskItem({
  task,
  categories,
  onToggleComplete,
  onDelete,
  onRenameTask,
  onUpdateTaskCategory,
  onUpdateTaskDueDate,
}) {
  // storing editing state
  const [editing, setEditing] = useState(false);
  // storing temporary text
  const [tempText, setTempText] = useState(task.text);

  const handleStartEditing = () => {
    setTempText(task.text);
    setEditing(true);
  };

  const handleCancelEditing = () => {
    setTempText(task.text);
    setEditing(false);
  };

  const handleSaveEditing = () => {
    const trimmed = tempText.trim();
    if (trimmed) {
      onRenameTask(task.id, trimmed);
    }
    setEditing(false);
  };

  const handleCategoryChange = (newCat) => {
    onUpdateTaskCategory(task.id, newCat);
  };

  const handleDueDateChange = (newDate) => {
    onUpdateTaskDueDate(task.id, newDate);
  };

  return (
    // group used for hover effects on entire task row
    <li className="group relative flex flex-col p-2 border rounded-md space-y-2">
      {/* displaying toggle pencil and delete on first row */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? "mark as incomplete" : "mark as complete"}
          className="mr-2"
        >
          {task.completed ? <Check className="text-green-500" /> : "○"}
        </Button>

        <div className="flex-1 flex items-center">
          {editing ? (
            <Input
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              className="mr-2"
              autoFocus
            />
          ) : (
            <span
              className={cn(
                "flex-1",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.text}
            </span>
          )}

          {editing ? (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="hover:text-blue-400"
                onClick={handleCancelEditing}
                aria-label="cancel edit"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="hover:text-blue-400"
                onClick={handleSaveEditing}
                aria-label="confirm edit"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="hidden group-hover:inline-block ml-2 hover:text-blue-400"
              onClick={handleStartEditing}
              aria-label="edit text"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button
          variant="destructive"
          onClick={() => onDelete(task.id)}
          aria-label="delete task"
          className="ml-2"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      {/* displaying category dropdown and date picker on second row */}
      <div className="flex items-center space-x-2">
        <Select value={task.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-40" type="button">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.name} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DatePicker
          date={task.dueDate ? new Date(task.dueDate) : null}
          onDateChange={handleDueDateChange}
          className="w-[200px]"
        />

        {task.dueDate && (
          <span className="text-sm italic text-gray-500">
            due {format(new Date(task.dueDate), "PPP")}
          </span>
        )}
      </div>
    </li>
  );
}
