// components/ConnectWallet.js
import React, { useState } from 'react';
import Web3 from 'web3';
// import { toChecksumAddress } from 'ethereumjs-util';

const MetaMaskConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0]
        // const account = toChecksumAddress(accounts[0]);
        console.log(account);
        checkNFTOwnership(account);
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    } else {
      alert('Please install Metamask to use this feature.');
    }
  };

  const checkNFTOwnership = async (account) => {
    // NFTコントラクトアドレスを設定
    const nftContractAddress = '0x138A5C693279b6Cd82F48d4bEf563251Bc15ADcE';

    // ERC721 ABIをインポートまたは定義
    const erc721ABI = [
      {
        constant: true,
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    const web3 = new Web3(window.ethereum);
    const nftContract = new web3.eth.Contract(erc721ABI, nftContractAddress);
    const balance = await nftContract.methods.balanceOf(account).call();

    console.log(balance);

    if (parseInt(balance) > 0) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {isConnected ? 'Connected' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default MetaMaskConnection;
