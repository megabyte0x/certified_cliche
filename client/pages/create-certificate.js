import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftAddress, nftTransferAddress } from "../../CONTRACT/config";

import NFT from "../abi/NFT.json";
import NFTTransfer from "../abi/NFTTransfer.json";
import { isCommunityResourcable } from "@ethersproject/providers";

export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({name: '', description: '' });

    const router = useRouter();

    //NFT file URL
    async function onChange(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            );
            //IPFS of the NFT
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            
            setFileUrl(url);
        } catch (error) {
            console.log(error);
        }
    }

    // List and Save the item IPFS
    async function createCertificate() {
        const { name, description } = formInput;

        //If any of them is not present then it will not create the Item
        if (!name || !description || !fileUrl) return;

        const data = JSON.stringify({
            name, description, image: fileUrl,
        });

        try {
            const added = await client.add(data);
            //IPFS of the data
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            console.log(url)
            putCertificate(url);
        } catch (error) {
            console.log("Error in Uploading File:", error);
        }
    }

    //Creating the NFT and Making it to sale    
    async function putCertificate(url) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        //NFT Contract
        let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
        let transaction = await contract.createToken(url);
        let tx = await transaction.wait();

        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber(); //Token Id Of the NFT


        //NFT Market Contract
        contract = new ethers.Contract(nftTransferAddress, NFTTransfer.abi, signer);

        let listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString();

        transaction = await contract.createCertificate(
            nftAddress,
            tokenId,
            { value: listingPrice }
        );
        await transaction.wait();
        console.log("completed")
        router.push('/');
    }

    return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                <input
                    placeholder="Certificate Name"
                    className="mt-8 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <textarea
                    placeholder="Certificate Description"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                />
                <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={onChange}
                />
                {
                    fileUrl && (
                        <img className="rounded mt-4" width="350" src={fileUrl} />
                    )
                }
                <button onClick={createCertificate} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                    Create Certificate
                </button>
            </div>
        </div>
    );
}
