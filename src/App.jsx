import React, { useState } from 'react';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';

const initialTasks = [
  { id: 1, text: 'Refill food bowl before yowling begins', completed: false },
  { id: 2, text: 'Schedule vet visit, prepare for betrayal', completed: false },
  { id: 3, text: 'Remove cat from keyboard (again)', completed: true },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <main>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
      />
      <TaskStats tasks={tasks} />
    </main>
  );
};

export default App; 