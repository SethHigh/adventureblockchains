"use client";

import styles from "./inv.module.css";
import { useRouter } from "next/navigation";
import { useWallet } from '../context/WalletContext';

export default function InventoryPage() {
  const router = useRouter();
  const {  walletAddress, setWalletAddress } = useWallet(); //need to logout wallets

  const handleGoHome = () => {
    router.push("/");//navigate to specified page
  };

  const handleSignOut = () => {
    //console.log("Wallet before sign out:", walletAddress); //error testing
    setWalletAddress(null); //remove account/wallet
    router.push('/'); //go to login page
  };

  const handleGoCrafting = () => {
    router.push("/crafting")//navigate to specified page
  };

  const handleGoAdventure = () => {
    router.push("/adventure");//navigate to specified page
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button onClick={handleGoHome} className={styles.iconPlaceholder}>
        </button>
        <h1 className={styles.title}>Inventory</h1>
        <button onClick={handleSignOut} className={styles.signout}>Sign out</button>
      </div>

      <div className={styles.main}>
        <button onClick={handleGoCrafting} className={styles.section}>
          <div className={styles.imagePlaceholder}>Crafting</div>
        </button>

        <div className={styles.inventory}>
          <h2>Inventory</h2>
        </div>

        <button onClick={handleGoAdventure} className={styles.section}>
          <div className={styles.imagePlaceholder}>Adventure</div>
        </button>
      </div>
    </div>
  );
}