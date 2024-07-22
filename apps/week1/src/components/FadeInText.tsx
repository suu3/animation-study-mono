import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import styles from "./fade-in-text.module.css";

const bottomTitleVariant = {
  appeared: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: 1,
    },
  },
  disappeared: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
};

const bottomSpanVariant = {
  appeared: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
  disappeared: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

const FadeInText = () => {
  const [textDisappeared, setTextDisappeared] = useState(false);
  const { scrollY } = useScroll();
  //   const handleTitleHover = () => setTextDisappeared((prevState) => !prevState);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!textDisappeared && latest === 0) {
      setTextDisappeared(true);
    }
    if (textDisappeared && latest !== 0) {
      setTextDisappeared(false);
    }
  });

  return (
    <motion.div>
      <motion.p
        initial="appeared"
        animate={textDisappeared ? "disappeared" : "appeared"}
        variants={bottomTitleVariant}
        className={styles["title-text"]}
      >
        {"ZERO STUDIOS is an integrated creative agency"
          .split("")
          .map((char) => {
            return (
              <motion.span variants={bottomSpanVariant}>
                {char === " " ? <>&nbsp;</> : char}
              </motion.span>
            );
          })}
      </motion.p>
    </motion.div>
  );
};

export default FadeInText;
