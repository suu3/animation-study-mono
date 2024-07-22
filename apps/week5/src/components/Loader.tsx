import { Html, useProgress } from "@react-three/drei";
import styles from "./loader.module.css";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className={styles.loader}>
      {progress} % loaded
    </Html>
  );
}

export default Loader;
