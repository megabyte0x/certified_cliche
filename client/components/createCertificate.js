import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Image from "next/image";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftAddress, nftTransferAddress } from "../../CONTRACT/config";

import NFT from "../abi/NFT.json";
import NFTTransfer from "../abi/NFTTransfer.json";
import { isCommunityResourcable } from "@ethersproject/providers";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ name: "", description: "" });
  const [checkBox, setCheckBox] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();

  /**
   * On nft file change
   * @param {event} e event
   */
  async function onChange(e) {
    //selecting the first file, which is uploaded
    const file = e.target.files[0];
    try {
      //uploading it to ipfs
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      //creating the url to fetch the uploaded file
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      setFileUrl(url);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Create a new creatificate.
   */
  async function createCertificate() {
    //getting name, description from the formInput dictionary
    const { name, description } = formInput;

    //If any of them is not present then it will not create the Item
    if (!name || !description || !fileUrl) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      //uploading the certificate to ipfs
      const added = await client.add(data);
      //creating url to fetch the uploaded certificate
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      //listing the certificate or marking it as sale
      putCertificate(url);
    } catch (error) {
      console.log("Error in Uploading File:", error);
    }
  }

  /**
   * Creating the NFT and Making it to sale. Calling the web 3.0 contracts here.
   * @param {string} url ipfs url where certificate is uploaded
   */
  async function putCertificate(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    //NFT Contract
    let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
    //minting the certificate
    let transaction = await contract.createToken(url);
    //waiting for the minting transaction to finish
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber(); //Token Id Of the NFT

    //NFT Market Contract
    contract = new ethers.Contract(nftTransferAddress, NFTTransfer.abi, signer);

    //fetching listing price from the contract
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    //listing the certificate.
    transaction = await contract.createCertificate(nftAddress, tokenId, {
      value: listingPrice,
    });
    //waiting for the transaction to complete
    await transaction.wait();
    console.log("completed");
    //navigate back to home page
    router.push("/");
  }

  async function ClickedCheckbox() {
    setCheckBox(!checkBox);
  }
  async function ShowDropdown() {
    setDropdown(!dropdown);
  }
  return (
    <div className="grid place-items-center  ">
      <div className="lg:w-1/2 flex flex-col pb-12 w-5/6 md:4/6">
        <div className="md:grid md:grid-cols-3 ">
          <div className="flex flex-col col-span-2 md:mr-10">
            <input
              placeholder="Name"
              className="mt-8 border rounded-2xl p-4 mb-4 text-[#010101]"
              onChange={(e) =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
            />
            <textarea
              placeholder=" Description"
              className="mt-2 border rounded-2xl p-4 md:h-40 md:min-h-fit text-[#010101]"
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
            />
          </div>

          <div className="mt-6 hidden md:block ">
            <div className=" flex relative z-10 text-white text-5xl cursor-pointer">
              <p className="transform rotate-90 absolute top-28 left-28">
                &#x270E;
              </p>
              <p className="absolute top-36 left-28"> &#9473;</p>
            </div>
            <Image
              src="/assests/img.jpg"
              width={385}
              height={385}
              alt="Alt image"
            />
          </div>
        </div>
        <div className="flex my-7 md:space-x-5 space-x-2">
          <input
            type="checkbox"
            class="default:ring-2 w-6 h-6  rounded-2xl"
            onClick={ClickedCheckbox}
          />
          <p className="text-[#434343] text-lg leading-7 font-normal">
            Part of an event/group
          </p>
        </div>
        {checkBox === true && (
          <>
            <input
              placeholder="Event Name"
              className="mt-2 border rounded-2xl p-4 mb-4 text-[#010101] md:w-3/5"
            />
            <p className="text-[#7B7B7B] ">or create new event/group</p>
            <div className="md:grid md:grid-cols-3 ">
              <div className="flex flex-col col-span-2 md:mr-10">
                <div class=" relative">
                  <p
                    className="mt-2 border rounded-2xl p-4 opacity-60 mb-4 text-[#010101]"
                    onClick={ShowDropdown}
                  >
                    Select the event
                  </p>
                  <p
                    className="absolute right-4 top-4 text-xl cursor-pointer transform rotate-90"
                    onClick={ShowDropdown}
                  >
                   &#9658;
                  </p>
                  {dropdown && <l1 className=' absolute top-16 left-2  shadow-2xl bg-[#DEE4E7] w-full text-lg text-[#010101] leading-7 opacity-60 text-center py-1 font-normal z-10 cursor-pointer'>GirlScript Summer of Code</l1>}
                </div>
                <textarea
                  placeholder="Event Description"
                  className="mt-2 border rounded-2xl p-4 text-[#010101] md:h-40 md:min-h-fit"
                />
              </div>
              <div className="hidden md:block">
                <div className=" flex relative z-10 text-white text-5xl cursor-pointer">
                  <p className="absolute top-28 left-28 z-10 text-white text-5xl transform rotate-90">
                    &#x270E;
                  </p>
                  <p className="absolute top-36 left-28"> &#9473;</p>
                </div>
                <Image
                  src="/assests/img2.jpg"
                  width={385}
                  height={385}
                  alt="Alt image"
                />
              </div>
            </div>
          </>
        )}
        <input
          type="file"
          name="Asset"
          className="my-4 hidden"
          onChange={onChange}
        />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <button
          onClick={createCertificate}
          className="font-bold  bg-[#4A3CED] text-white py-3 px-8  text-center shadow-lg md:w-1/6 rounded-xl w-full "
        >
          Create
        </button>
      </div>
    </div>
  );
}
