import { motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./clip-path-transition.module.css";

const ClipPathTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className={styles["clip-path"]}
      animate={{
        clipPath: [
          "circle(20% at -30% 20%)",
          "circle(20% at 93% 51%)",
          "circle(20% at 12% 84%)",
          "circle(20% at 50% 50%)",
          "circle(100% at 50% 50%)",
        ],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ClipPathTransition;
