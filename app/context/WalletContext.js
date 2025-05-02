'use client';

import { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

//allows use of wallet on all pages
export function WalletProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}