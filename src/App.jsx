"use client";

import React from "react";
import { usePersistentState } from "./hooks/usePersistentState";
import TaskForm from "./components/ui/TaskForm";
import TaskList from "./components/ui/TaskList";
import TaskStats from "./components/ui/TaskStats";

// storing default categories in memory not persisted
// They do not remain across reloads
const initialCategories = [
  { name: "Uncategorized", color: "bg-gray-400" },
  { name: "Work", color: "bg-blue-500" },
  { name: "Personal", color: "bg-green-500" },
  { name: "Health", color: "bg-red-500" },
  { name: "Finance", color: "bg-yellow-500" },
];

// using example tasks if localstorage data not found
// They appear by default
const initialTasks = [
  {
    id: 1,
    text: "Refill food bowl before yowling begins",
    completed: false,
    category: "Personal",
    dueDate: new Date(2025, 2, 1),
  },
  {
    id: 2,
    text: "Remove cat from keyboard (again)",
    completed: false,
    category: "Health",
    dueDate: new Date(2025, 1, 15),
  },
  {
    id: 3,
    text: "Schedule vet visit, prepare for betrayal",
    completed: true,
    category: "Work",
    dueDate: null,
  },
];

export default function App() {
  // using persistent hook for storing tasks
  // This keeps tasks across browser restarts
  const [tasks, setTasks] = usePersistentState("persistedTasks", initialTasks);

  // keeping categories ephemeral in memory
  // They are not persisted
  const [categories, setCategories] = React.useState(initialCategories);

  // adding new task
  const addTask = (text, category, dueDate) => {
    const newTask = {
      id: Date.now(),
      text,
      category: category || "Uncategorized",
      completed: false,
      dueDate: dueDate || null,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // toggling task completion
  const toggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // deleting task
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // renaming task text
  const renameTask = (taskId, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, text: trimmed } : t))
    );
  };

  // changing task category
  const updateTaskCategory = (taskId, newCategory) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, category: newCategory } : t
      )
    );
  };

  // changing task due date
  const updateTaskDueDate = (taskId, newDate) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, dueDate: newDate } : t
      )
    );
  };

  // handling category operations in memory
  // They do not persist
  const handleAddCategory = (categoryName) => {
    const trimmed = categoryName.trim();
    if (
      trimmed &&
      !categories.some((cat) => cat.name.toLowerCase() === trimmed.toLowerCase())
    ) {
      setCategories((prev) => [...prev, { name: trimmed, color: "bg-gray-500" }]);
    }
  };

  const handleDeleteCategory = (categoryName) => {
    if (categoryName === "Uncategorized") return;
    setTasks((prev) =>
      prev.map((t) =>
        t.category === categoryName ? { ...t, category: "Uncategorized" } : t
      )
    );
    setCategories((prev) => prev.filter((cat) => cat.name !== categoryName));
  };

  const handleRenameCategory = (oldName, newName) => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.category === oldName ? { ...t, category: trimmed } : t
      )
    );
    setCategories((prev) =>
      prev.map((cat) =>
        cat.name === oldName ? { ...cat, name: trimmed } : cat
      )
    );
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <TaskForm
        onAddTask={addTask}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onRenameCategory={handleRenameCategory}
      />

      <TaskList
        tasks={tasks}
        categories={categories}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onRenameTask={renameTask}
        onUpdateTaskCategory={updateTaskCategory}
        onUpdateTaskDueDate={updateTaskDueDate}
      />

      <TaskStats tasks={tasks} />
    </main>
  );
}
