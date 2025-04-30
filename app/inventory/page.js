"use client";

import { useEffect, useState } from "react";
import styles from "./inv.module.css";
import { useRouter } from "next/navigation";
import { useWallet } from '../context/WalletContext';
import { getValue } from '../lib/storage';

export default function InventoryPage() {
  const router = useRouter();
  const { walletAddress, setWalletAddress } = useWallet();
  const [points, setPoints] = useState(null);

  const handleGoHome = () => {
    router.push("/"); // navigate to home page
  };

  const handleSignOut = () => {
    setWalletAddress(null); // remove account/wallet
    router.push('/'); // go to login page
  };

  const handleGoCrafting = () => {
    router.push("/crafting"); // navigate to crafting page
  };

  const handleGoAdventure = () => {
    router.push("/adventure"); // navigate to adventure page
  };

useEffect(() => {
  const fetchPoints = async () => {
    try {
      if (!walletAddress) return;
      const value = await getValue(walletAddress);
      setPoints(value.toString());
    } catch (err) {
      console.error(err.message);
    }
  };

  fetchPoints();
}, [walletAddress]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={handleGoHome} className={styles.iconPlaceholder}></button>
        <h1 className={styles.title}>Inventory</h1>
        <button onClick={handleSignOut} className={styles.signout}>Sign out</button>
      </div>

      <div className={styles.main}>
        <button onClick={handleGoCrafting} className={styles.section}>
          <div className={styles.imagePlaceholder}>Crafting</div>
        </button>

        <div className={styles.inventory}>
          <h2>Inventory</h2>
          <p>Points: {points !== null ? points : "Loading..."}</p>
        </div>

        <button onClick={handleGoAdventure} className={styles.section}>
          <div className={styles.imagePlaceholder}>Adventure</div>
        </button>
      </div>
    </div>
  );
}