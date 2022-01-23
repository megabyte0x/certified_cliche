import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Popup from 'reactjs-popup';


import { nftAddress, nftTransferAddress, rpc_url } from "../../CONTRACT/config";

import NFT from "../abi/NFT.json";
import NFTTransfer from "../abi/NFTTransfer.json";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [walletAdd, setWalletAdd] = useState(null);

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(rpc_url);

    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftTransferAddress, NFTTransfer.abi, provider);

    const data = await marketContract.fetchCertificatesLeft();
    const items = await Promise.all(data.map(async i => {

      const tokenUri = await tokenContract.tokenURI(i.tokenId);
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

  async function transferNFT(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftTransferAddress, NFTTransfer.abi, signer);

    const transaction = await contract.transferCertificate(
      nftAddress,
      nft.tokenId,
      walletAdd);
    await transaction.wait();
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
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} height={300} width={300} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <Popup trigger={<button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" >TRANSFER</button>}
                    position="center">
                    <div className="bg-white ">
                      <input
                        placeholder="Applicant Wallet Address"
                        className="mt-8 mb-8 ml-4 mr-4 border rounded"
                        onChange={e => setWalletAdd(e.target.value)}
                      />
                      <button onClick={() => transferNFT(nft)} className="bg-green">Transfer</button>
                    </div>
                  </Popup>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
