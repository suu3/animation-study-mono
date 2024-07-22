import { motion } from "framer-motion";
import styles from "./opacity-transition.module.css";
import { ReactNode } from "react";

const OpacityTransition = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <motion.div
        className={styles["main-wrapper"]}
        animate={{ opacity: [0, 1], y: [30, 0] }}
        transition={{ type: "spring", duration: 1 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default OpacityTransition;
