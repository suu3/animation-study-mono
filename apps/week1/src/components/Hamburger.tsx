import { useState } from "react";
import styles from "./hamburger.module.css";
import clsx from "clsx";
import { easeIn, motion } from "framer-motion";

const underlineVariant = {
  hover: {
    width: "100%",
    transition: {
      duration: 0.15,
    },
  },
  default: {
    width: "0",
    transition: {
      duration: 0.15,
    },
  },
};

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleOpen} className={clsx(styles["hamburger"])}>
        <header>
          <motion.span
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            style={{
              position: "relative",
            }}
            initial="default"
            whileHover="hover"
          >
            CONTACT
            <motion.span
              variants={underlineVariant}
              style={{
                position: "absolute",
                bottom: "-3px",
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: "#fff",
              }}
            />
          </motion.span>
          <span className={styles["line-wrapper"]}>
            {/* before */}
            <motion.span
              className={styles["line"]}
              animate={{
                opacity: isOpen ? 0 : 1,
                y: isOpen ? 0 : -5,
                rotate: isOpen ? 45 : 0,
              }}
              transition={{
                y: {
                  duration: 0.075,
                  ease: easeIn,
                  ...(!isOpen && { delay: 0.12 }),
                },
                opacity: {
                  duration: 0.075,
                  ease: easeIn,
                  ...(isOpen && { delay: 0.12 }),
                },
              }}
            ></motion.span>
            {/* span */}
            <motion.span
              className={styles["line"]}
              animate={{
                rotate: isOpen ? 45 : 0,
              }}
              transition={
                isOpen
                  ? {
                      rotate: {
                        delay: 0.12,
                        duration: 0.15,
                        ease: [0.215, 0.61, 0.355, 1],
                      },
                    }
                  : {
                      rotate: {
                        duration: 0.15,
                        ease: easeIn,
                      },
                    }
              }
            ></motion.span>
            {/* after */}
            <motion.span
              className={styles["line"]}
              animate={{
                y: isOpen ? 0 : 5,
                rotate: isOpen ? -45 : 0,
                // opacity: isOpen ? 0 : 1,
              }}
              transition={{
                y: {
                  duration: 0.075,
                  ease: easeIn,
                  ...(!isOpen && { delay: 0.12 }),
                },
                rotate: {
                  duration: 0.075,
                  ...(isOpen && { delay: 0.12 }),
                  ease: [0.215, 0.61, 0.355, 1],
                },
              }}
            ></motion.span>
          </span>
        </header>

        <motion.div
          className={styles["content"]}
          initial={{
            width: "auto",
            height: 0,
          }}
          animate={{
            width: isOpen ? 362 : "auto",
            height: isOpen ? 362 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          <div>메뉴들</div>
        </motion.div>
      </button>
    </>
  );
};

export default Hamburger;
