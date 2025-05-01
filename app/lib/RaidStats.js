import { ethers } from "ethers";

// ABI of the RaidCountandCheck contract
const raidAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "angelIncrease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "angelRaidMod",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "demonIncrease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "demonRaidMod",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "druidIncrease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "druidRaidMod",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRaidStats",
    "outputs": [
      {
        "internalType": "int256",
        "name": "_angelRaidMod",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "_demonRaidMod",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "_druidRaidMod",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "_totalRaids",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalRaids",
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

// Address of the deployed contract
const raidContractAddress = "0xd888283b6EA48c3cD6E856015b44BfD28f47f37d";

// Get contract instance
export async function getRaidContract() {
  if (typeof window === "undefined")
    throw new Error("Must run in the browser.");
  if (!window.ethereum)
    throw new Error("MetaMask not found. Please install MetaMask.");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(raidContractAddress, raidAbi, signer);
}

// Increase angel mod
export async function angelIncrease() {
  const contract = await getRaidContract();
  const tx = await contract.angelIncrease();
  await tx.wait();
}

// Increase demon mod
export async function demonIncrease() {
  const contract = await getRaidContract();
  const tx = await contract.demonIncrease();
  await tx.wait();
}

// Increase druid mod
export async function druidIncrease() {
  const contract = await getRaidContract();
  const tx = await contract.druidIncrease();
  await tx.wait();
}

// Get all raid stats
export async function getRaidStats() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(raidContractAddress, raidAbi, provider);

  const [angelRaidMod, demonRaidMod, druidRaidMod, totalRaids] = await contract.getRaidStats();

  return {
    angelRaidMod,
    demonRaidMod,
    druidRaidMod,
    totalRaids
  };
}
