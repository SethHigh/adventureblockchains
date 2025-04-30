"use client";

import { useEffect, useState } from "react";
import styles from "./inv.module.css";
import { useRouter } from "next/navigation";
import { useWallet } from '../context/WalletContext';
import { getUserData } from '../lib/storage';

export default function InventoryPage() {
  const router = useRouter();
  const { walletAddress, setWalletAddress } = useWallet();

  const [points, setPoints] = useState(null);
  const [itemPower, setItemPower] = useState(null);
  const [itemType, setItemType] = useState(null);

  const handleGoHome = () => router.push("/");
  const handleSignOut = () => {
    setWalletAddress(null);
    router.push('/');
  };
  const handleGoCrafting = () => router.push("/crafting");
  const handleGoAdventure = () => router.push("/adventure");

  //gets all data about the character
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!walletAddress) return;
        const data = await getUserData(walletAddress);
        setPoints(data.points.toString());
        setItemPower(data.itemPower.toString());
        setItemType(data.itemType.toString());
      } catch (err) {
        console.error("Failed to fetch user data:", err.message);
      }
    };

    fetchUserData();
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
          <p>Item Power: {itemPower !== null ? itemPower : "Loading..."}</p>
          <p>Item Type: {itemType !== null ? itemType : "Loading..."}</p>
        </div>

        <button onClick={handleGoAdventure} className={styles.section}>
          <div className={styles.imagePlaceholder}>Adventure</div>
        </button>
      </div>
    </div>
  );
}