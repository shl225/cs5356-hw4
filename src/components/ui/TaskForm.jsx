"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategorySelector from "./CategorySelector";
import { DatePicker } from "./DatePicker";

export default function TaskForm({
  onAddTask,
  categories,
  onAddCategory,
  onDeleteCategory,
  onRenameCategory,
}) {
  // storing task text
  const [text, setText] = useState("");
  // storing chosen category
  const [category, setCategory] = useState("");
  // storing date or null
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim(), category, dueDate);
      setText("");
      setCategory("");
      setDueDate(null);
    }
  };

  return (
    <form className="flex flex-col space-y-2 mb-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="w-full"
      />

      <div className="flex items-center space-x-2">
        <CategorySelector
          categories={categories}
          selectedCategory={category}
          onSelectCategory={setCategory}
          onAddCategory={onAddCategory}
          onDeleteCategory={onDeleteCategory}
          onRenameCategory={onRenameCategory}
        />

        <DatePicker
          date={dueDate}
          onDateChange={setDueDate}
          className="w-[200px]"
        />

        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}
