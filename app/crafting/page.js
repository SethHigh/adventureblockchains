"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./craft.module.css";
import { useRouter } from "next/navigation";
import { useWallet } from "../context/WalletContext";
import { getValue, setValue } from "../lib/storage"; // Ensure getValue and setValue are imported

export default function CraftingPage() {
  const router = useRouter();
  const { walletAddress, setWalletAddress } = useWallet();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoHome = () => {
    router.push("/"); // navigate to specified page
  };

  const handleCraft = async () => {
    if (!walletAddress) return alert("Connect wallet first");

    // Calculate the total points needed
    const pointsNeeded = quantity;

    try {
      setIsLoading(true);
      const currentPoints = await getValue(walletAddress); // Get current points from storage

       // Check if the user has enough points
      if (currentPoints.lt(pointsNeeded)) {
        //warns not enough points
        alert("Not enough points to craft the item!");
        setIsLoading(false);
        return;
      }
      // Subtract points from storage
      const updatedPoints = currentPoints.sub(pointsNeeded);
      await setValue(updatedPoints); // Update the points in storage
      //give pop up giving information
      alert(`Crafted item worth ${quantity} point(s)! You have ${updatedPoints.toString()} points left.`);
    } catch (err) {
      console.error("Error crafting item:", err);
      alert("Something went wrong.");
    }
    setIsLoading(false);
  };

  const handleSignOut = () => {
    setWalletAddress(null); // remove account/wallet
    router.push("/"); // go to login page
  };

  const handleGoToInventory = () => {
    router.push("/inventory"); // navigate to specified page
  };

  const handleGoToAdventure = () => {
    router.push("/adventure"); // navigate to specified page
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={handleGoHome} className={styles.iconPlaceholder}></button>
        <h1 className={styles.title}>Crafting</h1>
        <button onClick={handleSignOut} className={styles.signout}>Sign out</button>
      </div>

      <div className={styles.main}>
        <button onClick={handleGoToAdventure} className={styles.section}>
          <div className={styles.imagePlaceholder}>Adventure</div>
        </button>

        <div className={styles.craftingCenter}>
          <div className={styles.craftImage}>
            <Image src="/crafting-icon.png" alt="Craft Item" width={150} height={150} />
          </div>

          <button
            className={styles.craftButton}
            onClick={handleCraft}
            disabled={isLoading} // Disable while crafting
          >
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

        <button onClick={handleGoToInventory} className={styles.section}>
          <div className={styles.imagePlaceholder}>Inventory</div>
        </button>
      </div>
    </div>
  );
}
