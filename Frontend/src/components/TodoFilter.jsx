"use client"
import React from "react";
import "../styles/TodoFilter.css";

function TodoFilter({ filter, setFilter }) {
    const filters = [
        { id: "all", label: "All" },
        { id: "pending", label: "Pending"},
        { id: "completed", label: "Completed" },
      ];

    return (
        <div style={{ position: 'absolute', top: '33%', left: '33%', zIndex: 1000,  borderBottom: '1px solid #ccc', padding: '15px' }}>
            <div className="todo-filter" style={{ display: 'flex', padding: '10px', margin: '0 auto' }}>
                {filters.map((f) =>(
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`filter-button ${filter === f.id ? 'active' : ''}`}
                        >
                        {f.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TodoFilter;