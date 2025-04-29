'use client';

import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { useWallet } from './context/WalletContext';

export default function LoginPage() {
  const router = useRouter();
  const { setWalletAddress } = useWallet();//set wallet

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