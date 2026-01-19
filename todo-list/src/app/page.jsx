import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "@/components/NavBar";

const myTodos = [
  { id: 1, task: "Buy groceries" },
  { id: 2, task: "Walk the dog" },
  { id: 3, task: "Read a book" },
];

export default function Home() {
  return (
    <>
      <NavBar />
      <h1>This is a Todo App</h1>
      <p>
        Welcome to your Todo List application! Here you can manage your tasks
      </p>
      <ul>
        {myTodos.map((todo) => (
          <li key={todo.id}>
            <button className="btn-done">Done</button>
            <button className="btn-remove">Remove</button>
            <span>{todo.task}</span>
          </li>
        ))}
      </ul>
      <input type="text" />
      <button className="btn-new">New Todo</button>
    </>
  );
}
