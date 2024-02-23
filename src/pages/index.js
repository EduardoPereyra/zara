import React from "react";
import DragAndDrop from "./components/drag-and-drop/drag-and-drop";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.logo}>ZARA</h1>
      <DragAndDrop />
    </div>
  );
}
