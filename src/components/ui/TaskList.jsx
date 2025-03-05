"use client";

import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleComplete, onDelete }) => (
  <ul className="space-y-2">
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
    ))}
  </ul>
);

export default TaskList;
