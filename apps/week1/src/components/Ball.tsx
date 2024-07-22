import { motion, useTransform } from "framer-motion";
import { useScroll } from "framer-motion";
import styles from "./ball.module.css";

const Ball = () => {
  const { scrollY } = useScroll();
  const size = useTransform(scrollY, [800, 0], [30, 250]);

  return (
    <motion.div
      className={styles["box"]}
      initial={{ opacity: 0 }} // 초기 위치를 화면 왼쪽 밖으로 설정
      animate={{ opacity: 1 }} // 애니메이션 최종 위치를 화면 안쪽으로 설정
      // initial={{ scale: 1 }}
      // exit={{ opacity: 0.5, scale: 0.2 }}
      transition={{
        duration: 0.3,
        // ease: [0, 0.71, 0.2, 1.01],
      }}
      style={{
        width: size,
        height: size,
      }}
      // initial={{ opacity: 0, scale: 0.5 }}
      // animate={{ opacity: 1, scale: 1 }}
      // exit={{ opacity: 0.5, scale: 0.5 }}
    />
  );
};

export default Ball;
