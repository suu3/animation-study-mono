"use client";

import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";

const ScrollScene = dynamic(() => import("@/components/week4/"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.main}>
      {" "}
      <MotionConfig
        transition={{
          type: "spring",
          mass: 5,
          stiffness: 500,
          damping: 50,
          restDelta: 0.0001,
        }}
      >
        <Canvas
          camera={
            {
              // fov: 64, // 화각?
              // position: [2.3, 1.5, 2.3],
            }
          }
          style={{ background: "#ff4e9a" }}
        >
          <ScrollScene />
        </Canvas>
      </MotionConfig>
    </main>
  );
}
