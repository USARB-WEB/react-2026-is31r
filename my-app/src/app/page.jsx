import Image from "next/image";
import styles from "./page.module.css";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <h1>This is a React app homepage</h1>
     <Nav/>


      <div>Hello world</div>
    </>
  );
}
