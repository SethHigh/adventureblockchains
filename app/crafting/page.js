"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./craft.module.css";
import { useRouter } from "next/navigation";
import { useWallet } from "../context/WalletContext";
import { getPoints, setPoints, setItemPower, setItemType, getItemPower, getItemType } from "../lib/storage";

export default function CraftingPage() {
  const router = useRouter();
  const { walletAddress, setWalletAddress } = useWallet();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  //set up weapon type nicely
function getWeaponTypeName(type) {
  const normalizedType = Number(type);
  switch (normalizedType) {
    case 1: return "Holy";
    case 2: return "Life";
    case 3: return "Unholy";
    default: return "Unknown";
  }
}

  //handle when craft is called
const handleCraft = async () => {
  if (!walletAddress) return alert("Connect wallet first");

  const pointsNeeded = quantity;

  try {
    setIsLoading(true);
    const currentPoints = await getPoints(walletAddress);

    if (currentPoints.lt(pointsNeeded)) {
      alert("Not enough points to craft the item!");
      setIsLoading(false);
      return;
    }

    // Deduct points
    const updatedPoints = currentPoints.sub(pointsNeeded);
    await setPoints(updatedPoints);

    // Generate new item
    //randomizes power based on variation
    const variation = 0.35;
    const randomFactor = 1 + (Math.random() * 2 - 1) * variation;
    const newPower = Math.floor(pointsNeeded * randomFactor);
    const newType = Math.floor(Math.random() * 3) + 1;

    // Fetch previous item
    const prevPower = await getItemPower(walletAddress);
    const prevType = await getItemType(walletAddress);

    // Ask wants to keep old item or not
    const accept = window.confirm(
      `Crafted item:\n  Power: ${newPower}, Type: ${getWeaponTypeName(newType)}\n` +
      `Current item:\n  Power: ${prevPower ?? "None"}, Type: ${getWeaponTypeName(prevType)}\n\n` +
      `used ${pointsNeeded} point(s). Do you want to replace your current item with the new one?`
    );
    //keep new item
    if (accept) {
      await setItemPower(newPower);
      await setItemType(newType);
      alert(
        `New item saved! Power: ${newPower}, Type: ${getWeaponTypeName(newType)}. Remaining points: ${updatedPoints.toString()}`
      );
    } else { //don't keep new item
      alert(
        `Points lost:${pointsNeeded}, your old item remains. Remaining points: ${updatedPoints.toString()}`
      );
    }

  } catch (err) { //catch error
    console.error("Error crafting item:", err);
    alert("Something went wrong.");
  }

  setIsLoading(false);
};

  const handleSignOut = () => {
    if (isLoading) return; //prevents leaving page while waiting on event
    setWalletAddress(null); // remove account/wallet
    router.push("/"); // go to login page
  };

  const handleGoToInventory = () => {
    if (isLoading) return; //prevents leaving page while waiting on event
    router.push("/inventory"); // navigate to specified page
  };

  const handleGoToAdventure = () => {
    if (isLoading) return; //prevents leaving page while waiting on event
    router.push("/adventure"); // navigate to specified page
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Image
            src="/images/icon.png"
            alt="Icon"
            width={40}
            height={40}
            className={styles.icon}
          />
        <h1 className={styles.title}>Crafting</h1>
        <button onClick={handleSignOut} className={styles.signout} disabled={isLoading}>Sign out</button>
      </div>

      <div className={styles.main}>
        <button onClick={handleGoToAdventure} className={styles.section} disabled={isLoading}>
            <div className={styles.imageButton}>
              <Image
                  src="/images/adventure.png"
                  alt="adventure entrance"
                  fill
                  style={{ objectFit: 'cover', borderRadius: '12px' }}
              />
              <span className={styles.imageButtonText}>Adventure</span>
            </div>
          </button>

        <div className={styles.craftingCenter}>
          <div className={styles.craftImage}>
            <Image
                src="/images/blacksmith.png"
                alt="blacksmith"
                fill
                style={{ objectFit: 'contain', borderRadius: '8px' }}
            />
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

        <button onClick={handleGoToInventory} className={styles.section} disabled={isLoading}>
            <div className={styles.imageButton}>
              <Image
                  src="/images/Inventory.png"
                  alt="inventory building"
                  fill
                  style={{ objectFit: 'cover', borderRadius: '12px' }}
              />
              <span className={styles.imageButtonText}>Inventory</span>
            </div>
          </button>
      </div>
    </div>
  );
}
