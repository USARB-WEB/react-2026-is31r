"use client";

import { useState } from "react";

function saveToLocalStorage(todos) {
    localStorage.setItem("myTodos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
    if (typeof window === "undefined") {
        return [];
    }
    

    console.log("Loading todos from localStorage");

    const todosString = localStorage.getItem("myTodos") || null;
    if (todosString) {
        return JSON.parse(todosString);
    }
    return [];
}

export default function TodoList() {
    const [newTodoText, setNewTodoText] = useState("");
    const [myTodos, setMyTodos] = useState(loadFromLocalStorage());

    const [lastTodoId, setLastTodoId] = useState(3);

    function handleNewTodoBtnClicked() {
        const newTodo = {
            id: lastTodoId + 1,
            task: newTodoText,
        };

        setMyTodos([...myTodos, newTodo]);
        setNewTodoText("");
        setLastTodoId(lastTodoId + 1);
        console.log("New todo added:", myTodos);
        saveToLocalStorage([...myTodos, newTodo]);
    }

    function handleTodoDoneClicked(todoId) {
        console.log("Todo done clicked:", todoId);
        const updatedTodos = myTodos.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, isDone: true };
            }
            return todo;
        });
        setMyTodos(updatedTodos);
        saveToLocalStorage(updatedTodos);
    }

    function handleBtnDeleteClicked(todoId) {
        const updatedTodos = myTodos.filter((todo) => todo.id !== todoId);
        setMyTodos(updatedTodos);
        saveToLocalStorage(updatedTodos);
    }

    const handleNewTodoInputChange = (e) => {
        setNewTodoText(e.target.value);
    }

    return (
        <>
            <ul>
                {myTodos.map((todo) => (
                    <li key={todo.id}>
                        {todo.isDone ? "✔️" : ""}
                        {!todo.isDone && (
                            <>
                                <button 
                                    className="btn-done"
                                    onClick={() => handleTodoDoneClicked(todo.id)}
                                    >Done</button>
                                <button
                                    className="btn-remove"
                                    onClick={() => handleBtnDeleteClicked(todo.id)}
                                >Remove</button>
                            </>
                        )}

                        <span>{todo.task}</span>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTodoText}
                onChange={handleNewTodoInputChange}
            />
            <button
                className="btn-new"
                onClick={handleNewTodoBtnClicked}
            >New Todo</button>
        </>
    );
}