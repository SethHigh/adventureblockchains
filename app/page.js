'use client';

import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { useWallet } from './context/WalletContext';
import Image from 'next/image';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { setWalletAddress } = useWallet();//set wallet

  //runs after button press to attempt to interact with metamask
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        //used to get and then set wallet for use
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);

        router.push('/inventory');
      } catch (error) {
        console.error("User rejected wallet connection:", error);//person said no
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");//if no Metamask to connect
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login with MetaMask</h1>

      <div className={styles.imageRow}>
        <Image
          src="/images/icon.png"
          alt="App Icon"
          width={100}
          height={100}
          className={styles.icon}
        />
        <span className={styles.arrow}>→</span>
        <Image
          src="/images/metamask.png"
          alt="MetaMask Symbol"
          width={100}
          height={100}
          className={styles.icon}
        />
      </div>

      <button className={styles.button}  onClick={connectWallet}>Connect MetaMask</button>
      <p>Images for this website are currently AI generated, may change in the future</p>
    </div>
  );
}