import { NavLink } from "react-router-dom";
import styles from "./layout.module.css";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

const Link = ({ content, link }: { content: ReactNode; link: string }) => {
  return (
    <NavLink to={link}>
      <motion.span
        className={styles["link"]}
        initial="default"
        whileHover="hover"
      >
        {content}
        <motion.span
          variants={underlineVariant}
          className={styles["underline"]}
        />
      </motion.span>
    </NavLink>
  );
};

const Header = () => {
  return (
    <header className={styles["nav"]}>
      {[
        {
          link: "/home",
          content: "Home",
        },
        {
          link: "/opacity",
          content: "Opacity",
        },
        {
          link: "/background",
          content: <span id="nav-background">Background</span>,
        },
        {
          link: "/clip-path",
          content: "ClipPath",
        },
      ].map((item) => (
        <Link {...item} />
      ))}
    </header>
  );
};

export default Layout;

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
