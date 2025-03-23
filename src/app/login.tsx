"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    freighterApi?: {
      isConnected: () => Promise<boolean>;
      getPublicKey: () => Promise<string>;
    };
  }
}

function LoginButton({
  onAccountChange,
}: {
  onAccountChange: (account: string | null) => void;
}) {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    checkFreighterConnection();
  }, []);

  const checkFreighterConnection = async () => {
    if (window.freighterApi) {
      try {
        const connected = await window.freighterApi.isConnected();
        if (connected) {
          const publicKey = await window.freighterApi.getPublicKey();
          setAccount(publicKey);
          onAccountChange(publicKey);
        }
      } catch (error) {
        console.error("Error checking Freighter:", error);
      }
    }
  };

  const connectFreighter = async () => {
    if (!window.freighterApi) {
      alert("⚠️ Freighter no está instalado o habilitado.");
      return;
    }

    try {
      const publicKey = await window.freighterApi.getPublicKey();
      setAccount(publicKey);
      onAccountChange(publicKey);
    } catch (error) {
      console.error("Error connecting Freighter:", error);
      alert("Error connecting to Freighter.");
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
            Disconnect Freighter
          </button>
        </div>
      ) : (
        <button
          className="bg-purple-950 hover:bg-purple-800 text-white px-4 py-2 rounded-md transition-colors"
          onClick={connectFreighter}
        >
          Connect with Freighter
        </button>
      )}
    </div>
  );
}

export default LoginButton;