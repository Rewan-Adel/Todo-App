"use client"
import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "../styles/TodoItem.css";
import { deleteTask, updateTask, markTask } from "../services/TasksService";

function TodoItem({ todo, onEdit, onDelete, onToggle }) {
    const [isChecked, setIsChecked] = useState(todo.status === "completed");
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    
    React.useEffect(() => {
        setIsChecked(todo.status === "completed");
    }, [todo.status]);
    
    const token = localStorage.getItem("token");

    const handleDelete = async (id) => {
        try {
            await deleteTask(token, id);
            onDelete(id); 
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const handleToggle = async (id) => {
        try {
            const newStatus = !isChecked;
            setIsChecked(newStatus);
            await markTask(token, id);
            onToggle(id); 
            } catch (error) {
            console.error("Failed to update task:", error);
            setIsChecked(!newStatus);
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            const updatedTask = await updateTask(token, todo._id, { title: editedTitle });
            setIsEditing(false);
            onEdit(todo._id, updatedTask.title); 
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditedTitle(todo.title);
        }
    };
    
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(todo._id)}
                aria-label={`Mark ${todo.title} as ${isChecked ? 'pending' : 'complete'}`}
            />
            
            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={handleKeyDown}
                    className="edit-input"
                    autoFocus
                />
            ) : (
                <>
                <span className={`todo-text ${isChecked ? "completed" : ""}`}>
                    {todo.title}
                </span>
                <p className="todo-date">
                  {new Date(todo.createdAt).toLocaleString()}
                </p>
                </>
              
              
            )}
            
            {!isEditing && (
                <>
                    <button 
                        className='edit-icon' 
                        onClick={handleEditClick}
                        aria-label="Edit task"
                    >
                        <CiEdit />
                    </button>
                    <button 
                        className='delete-icon' 
                        onClick={() => handleDelete(todo._id)}
                        aria-label="Delete task"
                    >
                        <MdOutlineDeleteOutline />
                    </button>

                </>
            )}
        </div>
    );
}

export default TodoItem;