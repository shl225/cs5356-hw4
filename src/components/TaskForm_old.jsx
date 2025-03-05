import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText('');
    }
  };

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button className='add-btn' type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm; 