"use client"
import React, { useState } from 'react';
import { addTask } from '../services/TasksService';
import '../styles/TodoInput.css';

function TodoInput() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleTitleChange = (e) => setTask(e.target.value);
  const handleDescChange = (e) => setDescription(e.target.value);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const taskData = { title: task, description, completed: false };
      await addTask(token, taskData);
      setTask('');
      setDescription('');
    } catch (error) {
      console.error("Error adding task:", error);
      setErrorMsg(error.message || "Failed to add task. Please try again.");
    }
  }

  return (
    <div style={{ position: 'fixed', top: '22%', left: '23%', zIndex: 1000 }}>
      <div className="todo-input" style={{ display: 'flex', padding: '10px', margin: '0 auto' }}>
        <form onSubmit={handleAddTask} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            className='task-title'
            value={task}
            onChange={handleTitleChange}
            placeholder="Title"
          />
          <input
            type="text"
            className='task-desc'
            value={description}
            onChange={handleDescChange}
            placeholder="Description"
          />
          <button type="submit" style={{ marginLeft: '10px' }}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default TodoInput;
