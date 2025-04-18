import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/auth/signup" className={styles.button}>
          Sign up
        </Link>
        <Link href="/auth/login" className={styles.button}>
          Login
        </Link>
        <Link href="/inventory" className={styles.button}>
          Fake Login(temp)
        </Link>
      </main>
    </div>
  );
}
