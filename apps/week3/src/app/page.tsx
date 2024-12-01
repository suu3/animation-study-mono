import Link from "next/link";
import styles from "./page.module.css";

export default function App() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Links</h1>
      <div className={styles.links}>
        <Link className={styles.link} href="/scroll">
          scroll Animation
        </Link>
        <Link className={styles.link} href="/test">
          scroll Animation test
        </Link>
        <Link className={styles.link} href="/test2">
          mouse Animation test
        </Link>
      </div>
    </main>
  );
}
