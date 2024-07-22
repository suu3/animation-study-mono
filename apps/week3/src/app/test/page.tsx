"use client";

import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import GLBModel from "./GLBModel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas>
        <Suspense fallback={null}>
          <ScrollControls pages={3} distance={1} damping={4}>
            <GLBModel />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}
