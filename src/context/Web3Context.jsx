import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    try {
      console.log("Triggering connectWallet...");
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await _provider.send("eth_requestAccounts", []);
        
        // Ethers v6 signer fetching
        const _signer = await _provider.getSigner();
        const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, _signer);

        setAccount(accounts[0]);
        setProvider(_provider);
        setSigner(_signer);
        setContract(_contract);
        console.log("Successfully connected account:", accounts[0]);
      } else {
        console.error("window.ethereum is not found! MetaMask or Web3 provider is missing.");
        alert("Please install MetaMask or a compatible Web3 wallet.");
      }
    } catch (err) {
      console.error("MetaMask connection failed or user rejected request. Error details:", err);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          // When account changes we should ideally update the signer and contract too,
          // but for this mock implementation fetching an initial connection works.
        } else {
          setAccount(null);
        }
      });
    }
  }, []);

  return (
    <Web3Context.Provider value={{ account, provider, signer, contract, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3 = () => useContext(Web3Context);
