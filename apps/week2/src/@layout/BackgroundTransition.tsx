import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import styles from "./background-transition.module.css";

const SIZE = 200;

const BackgroundTransition = ({ children }: { children: ReactNode }) => {
  const [inset, setInset] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const targetElement = document.getElementById("nav-background");
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const top = rect.top + rect.height / 2 - SIZE / 2;
      const left = rect.left + rect.width / 2 - SIZE / 2;

      setInset({
        top,
        left,
      });
    }
  }, []);

  return (
    <>
      {inset?.top && inset?.left && (
        <>
          {/* <motion.svg
            xmlns="http://www.w3.org/2000/motion.svg"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            // preserveAspectRatio="none"
            className={styles["dekagram"]}
            initial={{ scale: 1, rotate: 0, ...inset }}
            animate={{
              scale: 20,
              rotate: 360,
              fill: "#fd94f0",
            }}
            transition={{ duration: 4 }}
          >
            <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12Z" />
          </motion.svg> */}
          <motion.div
            className={styles["star"]}
            style={{
              width: SIZE,
              height: SIZE,
            }}
            initial={{ scale: 1, rotate: 0, ...inset }}
            animate={{
              scale: 50,
              rotate: 360,
              backgroundColor: "#fd94f0",
            }}
            transition={{ duration: 3 }}
          />
        </>
      )}
      <main className={styles["main-wrapper"]}>{children}</main>
    </>
  );
};

export default BackgroundTransition;
