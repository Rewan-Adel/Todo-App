"use client"
import React from 'react';
import Header from '../components/header';
import TodoInput from '../components/TodoInput';  
import TodoList from '../components/TodoList';

function TasksPage() {
  return (
    <div className='home' >
      <Header />
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default TasksPage