import { motion } from "framer-motion";
import styles from "./curtain-transition.module.css";
import { ReactNode, useState } from "react";

const CurtainTransition = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <main className={styles["main-wrapper"]}>{children}</main>

      <motion.div
        key={location.pathname}
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{
          scaleY: 0,
        }}
        exit={{
          scaleY: 1,
        }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          transformOrigin: "bottom",
          backgroundColor: "red",
        }}
      />
      <motion.div
        key={location.pathname}
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: 0,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        exit={{
          scaleY: 0,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          transformOrigin: "top",
          backgroundColor: "black",
        }}
      />
    </>
  );
};

export default CurtainTransition;
