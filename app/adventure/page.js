"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./raid.module.css";
import { useWallet } from "../context/WalletContext";
import { setPoints, getPoints } from "../lib/storage";
import { useState } from "react";

// values for raiding
const RAID_REWARDS = {
  1: 10,
  2: 20,
  3: 30,
};

export default function AdventurePage() {
  const router = useRouter();
  const { walletAddress, setWalletAddress } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoHome = () => {
    router.push("/"); // navigate to specified page
  };

  const handleSignOut = () => {
    setWalletAddress(null); // remove account/wallet
    router.push('/'); // go to login page
  };


  const handleGoCrafting = () => {
    router.push("/crafting"); // navigate to crafting page
  };

  const handleGoInventory = () => {
    router.push("/inventory"); // navigate to specified page
  };

  //raids now do things
  const handleRaidClick = async (raidNumber) => {
    if (!walletAddress) return alert("Connect wallet first"); //ensure wallet is still connects
    const pointsToAdd = RAID_REWARDS[raidNumber];
    if (!pointsToAdd) return;

    setIsLoading(true);
    //tries to get value then added an amount to the stored value
    try {
      const current = await getPoints(walletAddress);
      const updated = current.add(pointsToAdd); // BigNumber addition
      await setPoints(updated);
      alert(`Raid ${raidNumber} complete! You gained ${pointsToAdd} points.`);
    } catch (err) { //throws error when failed to get or set value
      console.error("Error updating points:", err);
      alert("Something went wrong.");
    }
    setIsLoading(false);
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
          {[1, 2, 3].map((raidNumber) => (
            <div
              key={raidNumber}
              className={styles.raidCard}
              onClick={() => handleRaidClick(raidNumber)}
              style={{ cursor: "pointer", opacity: isLoading ? 0.5 : 1 }}
            >
              <Image
                src={`/raid${raidNumber}.png`}
                alt={`Raid ${raidNumber}`}
                width={200}
                height={200}
                className={styles.raidImage}
              />
              <div className={styles.raidOverlay}>
                Raid {raidNumber}
              </div>
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