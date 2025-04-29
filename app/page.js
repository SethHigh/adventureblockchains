'use client';

import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { useWallet } from './context/WalletContext';
import {useEffect} from "react";

export default function LoginPage() {
  const router = useRouter();
  const { walletAddress, setWalletAddress } = useWallet();//set wallet

  //use to ensure login and log out work, commented out when not needed
  /*
  useEffect(() => {
    console.log("Current wallet address on LoginPage:", walletAddress);
  }, [walletAddress]); */

  //runs after button press to attempt to interact with metamask
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
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
    <div>
      <h1>Login with MetaMask</h1>
      <button onClick={connectWallet}>Connect MetaMask</button>
    </div>
  );
}