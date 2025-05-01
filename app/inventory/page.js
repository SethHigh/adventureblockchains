"use client";

import { useEffect, useState } from "react";
import styles from "./inv.module.css";
import { useRouter } from "next/navigation";
import { useWallet } from '../context/WalletContext';
import { getUserData } from '../lib/storage';

export default function InventoryPage() {
  const router = useRouter();
  const {walletAddress, setWalletAddress} = useWallet();

  const [points, setPoints] = useState(null);
  const [itemPower, setItemPower] = useState(null);
  const [itemType, setItemType] = useState(null);

  const {name, recommendation} = getWeaponInfo(itemType);

  const handleGoHome = () => {
    router.push("/"); // navigate to specified page
  };

  const handleSignOut = () => {
    setWalletAddress(null); // remove account/wallet
    router.push("/"); // go to login page
  };

  const handleGoToCrafting = () => {
    router.push("/crafting"); // navigate to crafting page
  };

  const handleGoToAdventure = () => {
    router.push("/adventure"); // navigate to specified page
  };

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

  //gives information in a nicer way to user
  function getWeaponInfo(type) {
    switch (type) {
      case "1":
        return {name: "Holy", recommendation: "We recommend raiding the Crypt."};
      case "2":
        return {name: "Life", recommendation: "We recommend raiding the Angels."};
      case "3":
        return {name: "Unholy", recommendation: "We recommend raiding the Jungle."};
      default:
        return {name: "Unknown", recommendation: ""};
    }
  }

  return (
      <div className={styles.container}>
        <div className={styles.topBar}>
          <button onClick={handleGoHome} className={styles.iconPlaceholder}></button>
          <h1 className={styles.title}>Inventory</h1>
          <button onClick={handleSignOut} className={styles.signout}>Sign out</button>
        </div>

        <div className={styles.main}>
          <button onClick={handleGoToCrafting} className={styles.section}>
            <div className={styles.imagePlaceholder}>Crafting</div>
          </button>

          <div className={styles.inventory}>
            <h2 className={styles.centerText}>Inventory</h2>

            <p className={styles.centerText}>
              Points: {points !== null ? points : "Loading..."}
            </p>

            {itemType !== null && (
                <div className={styles.itemDisplay}>
                  <img
                      src={`/weapons/type${itemType}.png`}
                      alt={`Weapon Type ${itemType}`}
                      className={styles.itemImage}
                  />
                  {(() => {
                    const {name, recommendation} = getWeaponInfo(itemType);
                    return (
                        <>
                          <p className={styles.centerText}>
                            {name} Power: {itemPower !== null ? itemPower : "Loading..."}
                          </p>
                          <p className={styles.centerText} style={{fontStyle: "italic", color: "#666"}}>
                            {recommendation}
                          </p>
                        </>
                    );
                  })()}
                </div>
            )}
          </div>

          <button onClick={handleGoToAdventure} className={styles.section}>
            <div className={styles.imagePlaceholder}>Adventure</div>
          </button>
        </div>
      </div>
  );
}