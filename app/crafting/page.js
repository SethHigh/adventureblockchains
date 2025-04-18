"use client"; // Needed for interactivity like state

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./craft.module.css";

export default function CraftingPage() {
  const [quantity, setQuantity] = useState(1);

  const handleCraft = () => {
    alert(`Crafting item using ${quantity} points!`);
  };

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <Link href="/">
          <div className={styles.iconPlaceholder} />
        </Link>
        <h1 className={styles.title}>Crafting</h1>
        <Link href="/" className={styles.signout}>Sign out</Link>
      </div>

      {/* Main */}
      <div className={styles.main}>
        {/* Left side (optional back or art) */}
        <Link href="/inventory" className={styles.section}>
          <div className={styles.imagePlaceholder}>Inventory</div>
        </Link>

        {/* Center crafting content */}
        <div className={styles.craftingCenter}>
          <div className={styles.craftImage}>
            {/* Replace with actual image */}
            <Image src="/crafting-icon.png" alt="Craft Item" width={150} height={150} />
          </div>

          <button className={styles.craftButton} onClick={handleCraft}>
            Craft
          </button>

          <div className={styles.quantityPicker}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Right side (optional adventure or info) */}
        <Link href="/adventure" className={styles.section}>
          <div className={styles.imagePlaceholder}>Adventure</div>
        </Link>
      </div>
    </div>
  );
}