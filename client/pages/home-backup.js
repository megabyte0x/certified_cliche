import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Popup from 'reactjs-popup';
import classes from '../styles/Home.module.css'
import NFTCard from "./components/NFTCard/NFTCard";


import { nftAddress, nftTransferAddress, rpc_url } from "../../CONTRACT/config";

import NFT from "../abi/NFT.json";
import NFTTransfer from "../abi/NFTTransfer.json";

export default function HomePage() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [walletAdd, setWalletAdd] = useState(null);
  const [transferSelected, setTransferSelected] = useState(-1);

  useEffect(() => {
    //start loading the nfts when webpage loads
    loadNFTs();
  }, []);

  /**
   * Load all Nft
   * @returns {Promise<void>}
   */
  async function loadNFTs() {
    
    // For the Mumbai Testnet
    // const provider = new ethers.providers.JsonRpcProvider(rpc_url);

    // For the LocalHost
    //  const provider = new ethers.providers.JsonRpcProvider();

    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftTransferAddress, NFTTransfer.abi, provider);

    //fetching the certificates from the market contracts
    const data = await marketContract.fetchCertificatesLeft();
    const items = await Promise.all(data.map(async i => {
      //getting the ipfs url of each certificate item
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      //fetching the ipfs url, which will return a meta json
      const meta = await axios.get(tokenUri);

      let item = {
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item;
    }));
    setNfts(items);
    setLoadingState('loaded');
  }

  /**
   * Transfer the nft to a user
   * @param {object} nft Nft which needed to be transferred
   */
  async function transferNFT(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftTransferAddress, NFTTransfer.abi, signer);

    //calling transfer certificate contract
    const transaction = await contract.transferCertificate(
      nftAddress,
      nft.tokenId,
      walletAdd);
    //waiting for the transaction to finish
    await transaction.wait();
    //reload the nfts
    loadNFTs();
  }


  if (loadingState === "loaded" && !nfts.length) return (
    <h1 className="px-20 py-10 text-3xl" >No Certificates Created or Left to Transfer</h1>
  );

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 " >
          {
            nfts.map((nft, i) => {
              return(
              <NFTCard 
                key={i}
                nftImage={nft.image}
                nftName={nft.name}
                nftDesciption={nft.description}
              />
            )})
          }
        </div>
      </div>
    </div>
  );
}
