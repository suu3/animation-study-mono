import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import styles from "./text.module.css";
import clsx from "clsx";

const Text = () => {
  const [textDisappeared, setTextDisappeared] = useState(false);
  const { scrollY } = useScroll();
  //   const handleTitleHover = () => setTextDisappeared((prevState) => !prevState);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (textDisappeared && latest === 0) {
      setTextDisappeared(false);
    }
    if (!textDisappeared && latest !== 0) {
      setTextDisappeared(true);
    }
  });

  return (
    <motion.div className={styles["text-wrapper"]}>
      <motion.h1
        initial={"disappeared"}
        animate={textDisappeared ? "disappeared" : "appeared"}
        variants={bottomTitleVariant}
        className={clsx(styles["text"], styles["shown"])}
      >
        <motion.span variants={bottomSpanVariant}>Z</motion.span>
        <motion.span variants={bottomSpanVariant}>E</motion.span>
        <motion.span variants={bottomSpanVariant}>R</motion.span>
        <motion.span variants={bottomSpanVariant}>O</motion.span>
      </motion.h1>

      <h1 className={clsx(styles["text"], styles["hidden"])}>
        <span>Z</span>
        <span>E</span>
        <span>R</span>
        <span>O</span>
      </h1>
    </motion.div>
  );
};

export default Text;
const bottomTitleVariant = {
  appeared: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
  disappeared: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

const bottomSpanVariant = {
  appeared: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  disappeared: {
    y: "100%",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
