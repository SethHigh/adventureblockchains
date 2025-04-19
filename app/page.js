"use client";
import { useRouter } from 'next/navigation'
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const gosignup = async () => {
    await router.push("/auth/signup"); //navigate to specified page
  };

  const gologin = async () => {
    await router.push("/auth/login"); //navigate to specified page
  };

  const goFakeLogin = async () => {
    await router.push("/inventory"); //navigate to specified page
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button className={styles.button} onClick={gosignup}>
          Sign up
        </button>
        <button className={styles.button} onClick={gologin}>
          Login
        </button>
        <button className={styles.button} onClick={goFakeLogin}>
          Fake Login (temp)
        </button>
      </main>
    </div>
  );
}