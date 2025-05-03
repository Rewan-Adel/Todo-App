"use client"
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import Pagination from "@mui/material/Pagination";
import { getTasks, searchTasks } from "../services/TasksService";

function TodoList() {
    const [tasks, setTasks] = useState([]); // fetched tasks
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await getTasks(token);
                setTasks(data.tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
        const interval = setInterval(fetchTasks, 1000); // 1000 ms = 1 second
        return () => clearInterval(interval);
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredTodos = filter === "all"
        ? tasks
        : tasks.filter(todo => todo.status === filter);

    const paginatedTodos = filteredTodos.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <>
            <div>
                <TodoFilter filter={filter} setFilter={setFilter} />
            </div>
            {filteredTodos.length === 0 ? (
                <p className="empty-tasks" style={{ color: "white", fontSize: "20px", position: 'absolute', top: '48%', left: '43%', zIndex: 1000 }}>
                    No tasks yet
                </p>
            ) : (
                <ul className="todo-list" style={{ position: 'absolute', top: '48%', left: '28%', zIndex: 1000 }}>
                    <div className="todo-items" style={{ display: 'grid', padding: '10px', margin: '0 auto', gridTemplateColumns: 'repeat(1, 1fr)', gap: '25px' }}>
                        {paginatedTodos.map((todo) => (
                            <TodoItem key={todo._id} todo={todo} />
                        ))}
                    </div>
                    {filteredTodos.length === 0 ? null : (
                        <div>
                            <Pagination
                                count={Math.ceil(filteredTodos.length / itemsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                variant="outlined" color="primary"
                                sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                            />
                        </div>
                    )}
                </ul>
            )}
        </>
    );
}

export default TodoList;
