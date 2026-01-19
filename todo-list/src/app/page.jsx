import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "@/components/NavBar";
import { use } from "react";
import TodoList from "@/components/TodoList";



export default function Home() {
  return (
    <>
      <NavBar />
      <h1>This is a Todo App</h1>
      <p>
        Welcome to your Todo List application! Here you can manage your tasks
      </p>
      <TodoList />
    </>
  );
}
