"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TaskForm = ({ onAddTask }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText("");
    }
  };

  return (
    <form className="flex space-x-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="w-full"
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;
