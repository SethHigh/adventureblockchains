"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./raid.module.css";

export default function AdventurePage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleSignOut = () => {
    router.push("/");
  };

  const handleGoCrafting = () => {
    router.push("/crafting");
  };

  const handleGoInventory = () => {
    router.push("/inventory");
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={handleGoHome} className={styles.iconPlaceholder} />
        <h1 className={styles.title}>Adventure Page</h1>
        <button onClick={handleSignOut} className={styles.signout}>
          Sign out
        </button>
      </div>

      <div className={styles.main}>
        <button onClick={handleGoInventory} className={styles.section}>
          <div className={styles.imagePlaceholder}>Inventory</div>
        </button>

        <div className={styles.raids}>
          {[1, 2, 3].map((num) => (
            <div key={num} className={styles.raidCard}>
              <Image
                src={`/raid${num}.png`}
                alt={`Raid ${num}`}
                width={200}
                height={200}
                className={styles.raidImage}
              />
              <div className={styles.raidOverlay}>Raid</div>
            </div>
          ))}
        </div>

        <button onClick={handleGoCrafting} className={styles.section}>
          <div className={styles.imagePlaceholder}>Crafting</div>
        </button>
      </div>
    </div>
  );
}