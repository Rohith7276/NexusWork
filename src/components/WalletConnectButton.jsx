import React, { useState } from 'react';
import web3Service from '../services/web3Service';

const WalletConnectButton = ({ onConnect }) => {
  const [account, setAccount] = useState(null);

  const connect = async () => {
    try {
      await web3Service.init();
      const user = await web3Service.connectWallet();
      setAccount(user);
      onConnect(user);
    } catch (e) {
      alert('Wallet connection failed');
    }
  };

  return (
    <div className="p-4">
      {!account ? (
        <button
          onClick={connect}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="text-green-400">Connected: {account.slice(0, 6)}...{account.slice(-4)}</div>
      )}
    </div>
  );
};

export default WalletConnectButton;

