import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftAddress, nftTransferAddress } from "../../CONTRACT/config";

import NFT from "../abi/NFT.json";
import NFTTransfer from "../abi/NFTTransfer.json";

export default function CreatorDashboard() {
    const [nfts, setNFTs] = useState([]);
    // const [sold, setSold] = useState([]);

    const [loadingState, setLoadingState] = useState('not-loaded');

    useEffect(() => {
        loadNFTs();
    }, []);

    async function loadNFTs() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const marketContract = new ethers.Contract(nftTransferAddress, NFTTransfer.abi, signer);
        const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
        const data = await marketContract.fetchMyCertificates();

        const items = await Promise.all(data.map(async i => {
            const tokenURI = await tokenContract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenURI);

            let item = {
                name: meta.data.name,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                image: meta.data.image,
                description: meta.data.description
            };
            return item;
        }));

        // const soldItems = items.filter(i => i.sold);

        // setSold(soldItems);
        setNFTs(items);
        setLoadingState('loaded');
    }
    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">Don&apos;t Have any Certificate Currently</h1>)
    return (
        <div>
            <div className="p-4">
                <h2 className="text-4xl font-bold py-2">My Certificates</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                        nfts.map((nft, i) => (
                            <div key={i} className="border shadow rounded-xl overflow-hidden">
                                <img src={nft.image} className="rounded" />
                                <div className="p-4 bg-black">
                                    <p className="text-2xl font-bold text-white">{nft.name} </p>

                                    <p className="text-xl text-white">{nft.description} </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* <div className="px-4">
                {
                    Boolean(sold.length) && (
                        <div>
                            <h2 className="text-2xl py-2">Items sold</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                                {
                                    sold.map((nft, i) => (
                                        <div key={i} className="border shadow rounded-xl overflow-hidden">
                                            <img src={nft.image} className="rounded" />
                                            <div className="p-4 bg-black">
                                                <p className="text-2xl font-bold text-white">Price - {nft.price} MATIC</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div> */}
        </div>
    );
}