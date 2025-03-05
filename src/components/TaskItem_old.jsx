const TaskItem = ({ task, onToggleComplete, onDelete }) => (
  <li className="task-item">
    <button
      onClick={() => onToggleComplete(task.id)}
      className="toggle-btn"
      aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
    >
      {task.completed ? '✓' : '○'}
    </button>
    
    <span className={task.completed ? 'completed' : ''}>
      {task.text}
    </span>
    
    <button
      onClick={() => onDelete(task.id)}
      className="delete-btn"
      aria-label="Delete task"
    >
      🗑️
    </button>
  </li>
);

export default TaskItem; 