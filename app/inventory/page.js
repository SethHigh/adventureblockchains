"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./inv.module.css";
import { useRouter } from "next/navigation";

export default function InventoryPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Navigate to home
  };

  const handleSignOut = () => {
    router.push("/"); // Navigate to sign out page
  };

  const handleGoCrafting = () => {
    router.push("/crafting"); // Navigate to crafting page
  };

  const handleGoAdventure = () => {
    router.push("/adventure"); // Navigate to adventure page
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={handleGoHome} className={styles.iconPlaceholder}>
        </button>
        <h1 className={styles.title}>Inventory</h1>
        <button onClick={handleSignOut} className={styles.signout}>Sign out</button>
      </div>

      <div className={styles.main}>
        <button onClick={handleGoCrafting} className={styles.section}>
          <div className={styles.imagePlaceholder}>Crafting</div>
        </button>

        <div className={styles.inventory}>
          <h2>Inventory</h2>
        </div>

        <button onClick={handleGoAdventure} className={styles.section}>
          <div className={styles.imagePlaceholder}>Adventure</div>
        </button>
      </div>
    </div>
  );
}