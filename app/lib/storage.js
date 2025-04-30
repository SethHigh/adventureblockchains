import { ethers } from "ethers";

// ABI of storage
const storageAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "get",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "storedData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// address
const contractAddress = "0x80dF742655F8e8409F72071faC01f5E9D8F200e1";

//pulls their address again during this from metamask to ensure it get's their address
async function getContract() {
  //test if in browser
  if (typeof window === "undefined") {
    throw new Error("Must run in the browser.");
  }
  //ensure ethereum is working
  if (typeof window.ethereum === "undefined") {
    await new Promise(resolve => setTimeout(resolve, 100)); // delay 100ms
  }
  //ensure metamask is installed
  if (!window.ethereum) {
    throw new Error("MetaMask not found. Please install MetaMask.");
  }

  //get account of current person to use with contract
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  return new ethers.Contract(contractAddress, storageAbi, signer);
}

//sets value of storage smart contract
async function setValue(x) {
  const contract = await getContract();
  const tx = await contract.set(x);
  await tx.wait();
}

//gets value from storage smart contract
async function getValue(userAddress) {
  const contract = await getContract();
  const value = await contract.get(userAddress);
  return value;
}

export { setValue, getValue };