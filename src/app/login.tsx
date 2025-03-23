/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function LoginButton() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to connect.');
    }
  };

  return (
    <div>
      {account ? (
        <p className='text-gray-800 font-bold'>Connected Account: {account}</p>
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