const TaskStats = ({ tasks }) => {
  const completed = tasks.filter(task => task.completed).length;
  const remaining = tasks.length - completed;
  
  return (
    <div className="stats">
      <span>Total: {tasks.length}</span>
      <span>Completed: {completed}</span>
      <span>Remaining: {remaining}</span>
    </div>
  );
};

export default TaskStats; 