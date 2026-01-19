"use client";

import { use, useEffect, useState } from "react";

function saveToLocalStorage(todos, lastTodoId) {
    localStorage.setItem("myTodos", JSON.stringify(todos));
    localStorage.setItem("lastTodoId", JSON.stringify(lastTodoId));
}

function loadFromLocalStorage() {
    if (typeof window === "undefined") {
        return [];
    }


    console.log("Loading todos from localStorage");

    const todosString = localStorage.getItem("myTodos") || null;

    if (todosString) {
        try {
            return {
                lastTodoId: JSON.parse(localStorage.getItem("lastTodoId")) || 0,
                todos: JSON.parse(todosString),
            };
        } catch (e) {
            return {
                lastTodoId: 0,
                todos: [],
            };
        }

    }

    return {
        lastTodoId: 0,
        todos: [],
    };
}

export default function TodoList() {

    const [loading, setLoading] = useState(true);
    const [newTodoText, setNewTodoText] = useState("");
    const [myTodos, setMyTodos] = useState([]);
    const [addBtnDisabled, setAddBtnDisabled] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [backendResponseReceived, setBackendResponseReceived] = useState(false);

    const [lastTodoId, setLastTodoId] = useState(0);
    function handleNewTodoBtnClicked() {
        setFetching(true);
        const newTodo = {
            id: lastTodoId + 1,
            task: newTodoText,
        };

        setMyTodos([...myTodos, newTodo]);
        setNewTodoText("");
        setLastTodoId(lastTodoId + 1);
        console.log("New todo added:", myTodos);
        saveToLocalStorage([...myTodos, newTodo], lastTodoId + 1);
        setTimeout(() => {
            setFetching(false);
        }, 1000);
    }

    function handleTodoDoneClicked(todoId) {
        const updatedTodos = myTodos.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, isDone: true };
            }
            return todo;
        });
        setMyTodos(updatedTodos);
        saveToLocalStorage(updatedTodos, lastTodoId);
    }

    function handleBtnDeleteClicked(todoId) {
        const updatedTodos = myTodos.filter((todo) => todo.id !== todoId);
        setMyTodos(updatedTodos);
        saveToLocalStorage(updatedTodos);
    }

    const handleNewTodoInputChange = (e) => {
        setNewTodoText(e.target.value);
    }

    useEffect(() => {
        const { todos: initialTodos, lastTodoId: initialLastTodoId } = loadFromLocalStorage();
        setMyTodos(initialTodos);
        setLastTodoId(initialLastTodoId);
        setTimeout(() => {
            setBackendResponseReceived(true);
        }, 2000);
    }, []);

    useEffect(() => {
        console.log("New todo text changed:", newTodoText);
        if (newTodoText.trim().length >= 3) {
            setAddBtnDisabled(false);
        } else {
            setAddBtnDisabled(true);
        }
    }, [newTodoText]);

    useEffect(() => {
        if (backendResponseReceived) {
            setLoading(false);
        }
    }, [backendResponseReceived]);

    return (
        <>
            {loading && (
                <div>Loading...</div>
            )}

            {!loading && (
                <>
                    {myTodos && myTodos.length > 0 ? (
                        <>
                            <span>Total {myTodos?.length || 0} todos</span>
                            <span> | </span>
                            <span>
                                Completed {myTodos.filter((todo) => todo.isDone).length} todos
                            </span>
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
                        </>
                    ) : 'No todos yet. Add your first todo!'}
                    <input
                        type="text"
                        value={newTodoText}
                        onChange={handleNewTodoInputChange}
                    />
                    {fetching && <div>Saving...</div>}
                    <button
                        className="btn-new"
                        onClick={handleNewTodoBtnClicked}
                        disabled={addBtnDisabled}
                    >New Todo</button>
                </>
            )}
        </>
    );
}