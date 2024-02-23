import React, { useState } from "react";
import DragAndDrop from "./components/drag-and-drop/drag-and-drop";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(0.1, zoomLevel - 0.1));
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.logo}>ZARA</h1>
      <div className={styles.zoomButtons}>
        <button onClick={handleZoomOut}>Zoom Out -</button>
        <button onClick={handleZoomIn}>Zoom In +</button>
      </div>
      <div
        className={styles.zoomContainer}
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <DragAndDrop />
      </div>
    </div>
  );
}
