import Image from "next/image";
import Link from "next/link";
import styles from "./inv.module.css";

export default function InventoryPage() {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/">
          <div className={styles.iconPlaceholder} />
        </Link>
        <h1 className={styles.title}>Inventory</h1>
        <Link href="/" className={styles.signout}>Sign out</Link>
      </div>

      <div className={styles.main}>
        <Link href="/crafting" className={styles.section}>
          <div className={styles.imagePlaceholder}>Crafting</div>
        </Link>

        <div className={styles.inventory}>
          <h2>Inventory</h2>
        </div>

        <Link href="/adventure" className={styles.section}>
          <div className={styles.imagePlaceholder}>Adventure</div>
        </Link>
      </div>
    </div>
  );
}