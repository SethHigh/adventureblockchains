"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./raid.module.css";
import { useWallet } from "../context/WalletContext";
import { setPoints, getPoints, getItemPower, getItemType } from "../lib/storage";
import { useState } from "react";
import { getRaidStats, angelIncrease, demonIncrease, druidIncrease } from "../lib/RaidStats";

// base multiplier for editing
const RAID_REWARDS = {
  1: 1,
  2: 1,
  3: 1,
};

//determine raid rewards based item type
function getRaidModifier(weaponType, raidNumber) {
  const type = Number(weaponType);
  switch (type) {
    case 1: // Holy
      if (raidNumber === 1) return 2.0;  // Demons
      if (raidNumber === 3) return 0.5;  // Jungle
      break;
    case 2: // Life
      if (raidNumber === 2) return 2.0;  // Angels
      if (raidNumber === 1) return 0.5;  // Demons
      break;
    case 3: // Unholy
      if (raidNumber === 3) return 2.0;  // Jungle
      if (raidNumber === 2) return 0.5;  // Angels
      break;
  }
  return 1.0;
}

export default function AdventurePage() {

  const router = useRouter();
  const { walletAddress, setWalletAddress } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  //used for raid stats
  const [raidStats, setRaidStats] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const handleGoHome = () => {
    router.push("/"); // navigate to specified page
  };

  const handleSignOut = () => {
    setWalletAddress(null); // remove account/wallet
    router.push('/'); // go to login page
  };


  const handleGoToCrafting = () => {
    router.push("/crafting"); // navigate to crafting page
  };

  const handleGoToInventory = () => {
    router.push("/inventory"); // navigate to specified page
  };

//handles raids being clicked
const handleRaidClick = async (raidNumber) => {
  if (!walletAddress) return alert("Connect wallet first");

  const baseMultiplier = RAID_REWARDS[raidNumber];
  if (baseMultiplier === undefined) return;

  setIsLoading(true);
  try {
    const rawPower = await getItemPower(walletAddress);
    const itemType = await getItemType(walletAddress);

    const power = parseInt(rawPower, 10) || 0;
    const modifier = getRaidModifier(itemType, raidNumber);
    let reward = Math.floor(power * baseMultiplier * modifier);

    // Fetch stats
    const stats = await getRaidStats();
    const totalRaids = parseInt(stats.totalRaids.toString(), 10);
    let specificRaids = 0;

    //determine needed increase
    if (raidNumber === 1) {
      specificRaids = parseInt(stats.demonRaidMod.toString(), 10);
    } else if (raidNumber === 2) {
      specificRaids = parseInt(stats.angelRaidMod.toString(), 10);
    } else if (raidNumber === 3) {
      specificRaids = parseInt(stats.druidRaidMod.toString(), 10);
    }

    // Compute percentage
    const raidCompletionPercentage = totalRaids > 0 ? (specificRaids / totalRaids) * 100 : 0;

    // change the outcome based on how often it does it
    if (raidCompletionPercentage >= 38) {
      reward = Math.floor(reward * 0.5);
    } else if (raidCompletionPercentage <= 27) {
      reward = reward * 2;
    }

    const pointsToAdd = Math.max(10, reward);

    const current = await getPoints(walletAddress);
    const updated = current.add(pointsToAdd);
    await setPoints(updated);

    // raid increase count
    if (raidNumber === 1) {
      await demonIncrease();
    } else if (raidNumber === 2) {
      await angelIncrease();
    } else if (raidNumber === 3) {
      await druidIncrease();
    }


    //tells what raid does and how well as well as other info
    let outcomeMessage = `\n\nRaid complete! You gained ${pointsToAdd} points.`;
    if (raidCompletionPercentage >= 38) {
      outcomeMessage += "\nThe place seemed empty.";
    } else if (raidCompletionPercentage <= 27) {
      outcomeMessage += "\nThere is an abundance of resources.";
    }
    if (modifier === 0.5) {
      outcomeMessage += "\nElemental match up was bad.";
    } else if (modifier === 2) {
      outcomeMessage += "\nElemental match up was good.";
    }

    alert(outcomeMessage);

  } catch (err) {
    console.error("Error updating points:", err);
    alert("Something went wrong.");
  }
  setIsLoading(false);
};

//causes pop-up for show raid stats
const handleOpenRaidStats = async () => {
  try {
    const stats = await getRaidStats();
    console.log("Raw stats from getRaidStats:", stats);

    const formattedStats = {
      angelRaidMod: stats.angelRaidMod.toString(),
      demonRaidMod: stats.demonRaidMod.toString(),
      druidRaidMod: stats.druidRaidMod.toString(),
      totalRaids: stats.totalRaids.toString()
    };

    setRaidStats(formattedStats);
    setShowStats(true);
  } catch (error) {
    console.error("Error fetching raid stats:", error);
    alert("Failed to fetch raid stats.");
  }
};

//closes raid stat pop-up
const handleCloseRaidStats = () => {
  setShowStats(false);
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
        <button onClick={handleGoToInventory} className={styles.section}>
          <div className={styles.imagePlaceholder}>Inventory</div>
        </button>

        <div className={styles.raids}>
          <div className={styles.raidStatsButtonWrapper}>
            <button
              onClick={handleOpenRaidStats}
              disabled={isLoading}
              className={styles.raidStatsButton}
            >
              View Raid Stats
            </button>
          </div>

          {showStats && raidStats && (
            <div className={styles.popupModal}>
              <h3>Raid Stats</h3>
              <p><strong>Demon Modifier:</strong> {raidStats.demonRaidMod}</p>
              <p><strong>Angel Modifier:</strong> {raidStats.angelRaidMod}</p>
              <p><strong>Druid Modifier:</strong> {raidStats.druidRaidMod}</p>
              <p><strong>Total Raids:</strong> {raidStats.totalRaids}</p>
              <button onClick={handleCloseRaidStats}>Close</button>
            </div>
          )}

          <div
            className={styles.raidCard}
            onClick={() => handleRaidClick(1)}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          >
            <Image
              src="/raid1.png"
              alt="Raid the Demons"
              width={200}
              height={200}
              className={styles.raidImage}
            />
            <div className={styles.raidOverlay}>Raid the Demons</div>
          </div>

          <div
            className={styles.raidCard}
            onClick={() => handleRaidClick(2)}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          >
            <Image
              src="/raid2.png"
              alt="Raid the Angels"
              width={200}
              height={200}
              className={styles.raidImage}
            />
            <div className={styles.raidOverlay}>Raid the Angels</div>
          </div>

          <div
            className={styles.raidCard}
            onClick={() => handleRaidClick(3)}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          >
            <Image
              src="/raid3.png"
              alt="Raid the Druids"
              width={200}
              height={200}
              className={styles.raidImage}
            />
            <div className={styles.raidOverlay}>Raid the Druids</div>
          </div>
        </div>

        <button onClick={handleGoToCrafting} className={styles.section}>
          <div className={styles.imagePlaceholder}>Crafting</div>
        </button>
      </div>
    </div>
  );
}


