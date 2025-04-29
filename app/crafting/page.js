"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./craft.module.css";
import { useRouter } from 'next/navigation'
import { useWallet } from '../context/WalletContext';

export default function CraftingPage() {
  const router = useRouter();
  const {  walletAddress, setWalletAddress } = useWallet(); //need to logout wallets

  const [quantity, setQuantity] = useState(1);

  const handleGoHome = () => {
    router.push("/");//navigate to specified page
  };

  const handleCraft = () => {
    alert(`Crafting item using ${quantity} points!`);//prints affect of using points
  };

  const handleSignOut = () => {
    //console.log("Wallet before sign out:", walletAddress); //error testing
    setWalletAddress(null); //remove account/wallet
    router.push('/'); //go to login page
  };

  const handleGoToInventory = () => {
    router.push("/inventory");//navigate to specified page
  };

  const handleGoToAdventure = () => {
    router.push("/adventure");//navigate to specified page
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={handleGoHome} className={styles.iconPlaceholder}>
        </button>
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

        <button onClick={handleGoToInventory} className={styles.section}>
          <div className={styles.imagePlaceholder}>Inventory</div>
        </button>
      </div>
    </div>
  );
}