'use client';

import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { useWallet } from './context/WalletContext';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const { walletAddress, setWalletAddress } = useWallet(); // set wallet

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        //connects to metamask
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);

        // Call the API to create a new CID for the user
        await createNewCid(address);
        //go to inventory on success
        router.push('/inventory');
      } catch (error) {
        console.error("User rejected wallet connection:", error); // User said no
      }
    } else {
      //alert if MetaMask not installed
      alert("MetaMask is not installed. Please install it to use this app."); // If no MetaMask to connect
    }
  };
//creates a CID for the account
const createNewCid = async (walletAddress) => {
  try {
    const res = await axios.post('/api/createCID', { walletAddress });
    console.log("New CID created:", res.data.cid);
  } catch (error) {
    console.error("Error creating new CID:", error);
  }
};

  return (
    <div>
      <h1>Login with MetaMask</h1>
      <button onClick={connectWallet}>Connect MetaMask</button>
    </div>
  );
}