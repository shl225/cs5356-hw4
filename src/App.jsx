"use client";

import React, { useState, useEffect } from "react";
import TaskForm from "./components/ui/TaskForm";
import TaskList from "./components/ui/TaskList";
import TaskStats from "./components/ui/TaskStats";

//our API helper functions
import { fetchTasks, createTask, updateTask, deleteTask, fetchCategories } from "./api";

const initialCategories = [
  { name: "Uncategorized", color: "bg-gray-400" },
  { name: "Work", color: "bg-blue-500" },
  { name: "Personal", color: "bg-green-500" },
  { name: "Health", color: "bg-red-500" },
  { name: "Finance", color: "bg-yellow-500" },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(initialCategories);

  //loading tasks from API on mount
  useEffect(() => {
    fetchTasks()
      .then((loadedTasks) => setTasks(loadedTasks))
      .catch((err) => console.error("Error loading tasks:", err));
    
    //loading categories from API:
	fetchCategories()
	  .then((loadedCategories) => setCategories(loadedCategories))
	  .catch((err) => console.error("Error loading categories:", err));
  }, []);

  //adding new task
  const addTask = async (text, category, dueDate) => {
    try {
      const newTaskData = { text, category: category || "Uncategorized", completed: false, dueDate };
      const newTask = await createTask(newTaskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  //toggling task completion
  const toggleComplete = async (taskId) => {
    try {
      //finding task to update
      const taskToUpdate = tasks.find((t) => t.id === taskId);
      if (!taskToUpdate) return;
      const updatedTask = await updateTask(taskId, { completed: !taskToUpdate.completed });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  //deleting task
  const deleteTaskHandler = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  //renaming task
  const renameTask = async (taskId, newText) => {
    try {
      const updatedTask = await updateTask(taskId, { text: newText });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  //changing task category
  const updateTaskCategory = async (taskId, newCategory) => {
    try {
      const updatedTask = await updateTask(taskId, { category: newCategory });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  //changing task due date
  const updateTaskDueDate = async (taskId, newDate) => {
    try {
      const updatedTask = await updateTask(taskId, { dueDate: newDate });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm
        onAddTask={addTask}
        categories={categories}
        onAddCategory={(newCat) => {
          setCategories((prev) => [...prev, { name: newCat, color: "bg-gray-500" }]);
        }}
        onDeleteCategory={(cat) => {
          setCategories((prev) => prev.filter((c) => c.name !== cat));
        }}
        onRenameCategory={(oldName, newName) => {
          setCategories((prev) =>
            prev.map((c) => (c.name === oldName ? { ...c, name: newName } : c))
          );
        }}
      />
      <TaskList
        tasks={tasks}
        categories={categories}
        onToggleComplete={toggleComplete}
        onDelete={deleteTaskHandler}
        onRenameTask={renameTask}
        onUpdateTaskCategory={updateTaskCategory}
        onUpdateTaskDueDate={updateTaskDueDate}
      />
      <TaskStats tasks={tasks} />
    </main>
  );
}