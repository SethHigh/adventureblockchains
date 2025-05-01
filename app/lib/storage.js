import { ethers } from "ethers";

//ABI of contract
const storageAbi = [
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "get",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_points", "type": "uint256" }],
    "name": "setPoints",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_itemPower", "type": "uint256" }],
    "name": "setItemPower",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_itemType", "type": "uint256" }],
    "name": "setItemType",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getPoints",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getItemPower",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getItemType",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

// Address of contract
const contractAddress = "0xA481A9c49915194E88def76213F66398e87B2328";

//calls the contract
export async function getContract() {
  if (typeof window === "undefined") //check in browser to avoid errors
    throw new Error("Must run in the browser.");
  if (!window.ethereum) //ensure metamask is still there
    throw new Error("MetaMask not found. Please install MetaMask.");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(contractAddress, storageAbi, signer); //returns contract
}

// get everything
async function getUserData(userAddress) {
  const contract = await getContract();
  const [points, itemPower, itemType] = await contract.get(userAddress);
  return { points, itemPower, itemType };
}

//set points
async function setPoints(value) {
  const contract = await getContract();
  const tx = await contract.setPoints(value);
  await tx.wait();
}
//set item power
async function setItemPower(value) {
  const contract = await getContract();
  const tx = await contract.setItemPower(value);
  await tx.wait();
}
//set item type
async function setItemType(value) {
  const contract = await getContract();
  const tx = await contract.setItemType(value);
  await tx.wait();
}

//get points
async function getPoints(userAddress) {
  const contract = await getContract();
  return await contract.getPoints(userAddress);
}
//get item power
async function getItemPower(userAddress) {
  const contract = await getContract();
  return await contract.getItemPower(userAddress);
}
//get item type
async function getItemType(userAddress) {
  const contract = await getContract();
  return await contract.getItemType(userAddress);
}

export {
  getUserData,
  setPoints,
  setItemPower,
  setItemType,
  getPoints,
  getItemPower,
  getItemType
};