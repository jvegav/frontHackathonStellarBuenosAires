/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function LoginButton({ onAccountChange }: { onAccountChange: (account: string | null) => void }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          onAccountChange(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        onAccountChange(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to connect.');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    onAccountChange(null);
  };

  return (
    <div>
      {account ? (
        <div>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          className="bg-purple-950 hover:bg-purple-800 text-white px-4 py-2 rounded-md transition-colors"
          onClick={connectWallet}
        >
          Log In with MetaMask
        </button>
      )}
    </div>
  );
}

export default LoginButton;