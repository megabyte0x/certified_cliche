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
    <div className="grid place-items-center ">
      <div className="lg:w-1/2 flex flex-col pb-12 w-5/6 md:4/6">
        <div className="md:grid md:grid-cols-3 ">
          <div className="flex flex-col col-span-2 md:mr-12">
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

          <div className="md:block cursor-pointer relative  ">
                <div className="md:w-[270px] md:h-[276px] w-[200px] h-[200px] relative mx-auto mt-10 mb-4 ">
                  <Image
                    src="/assests/img.jpg"
                    layout="fill"
                    alt="Alt image"
                  />
                </div>
                <div className="absolute  md:top-[19vw] md:right-[9vw] xl:top-[46%] lg:left-[41%] lg:top-[20%] top-[36%] right-[45%]   ">
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 76 76"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M72.5 68.375H3.5C1.84062 68.375 0.5 69.7156 0.5 71.375V74.75C0.5 75.1625 0.8375 75.5 1.25 75.5H74.75C75.1625 75.5 75.5 75.1625 75.5 74.75V71.375C75.5 69.7156 74.1594 68.375 72.5 68.375ZM14.1594 60.5C14.3469 60.5 14.5344 60.4813 14.7219 60.4531L30.4906 57.6875C30.6781 57.65 30.8563 57.5656 30.9875 57.425L70.7281 17.6844C70.815 17.5976 70.884 17.4946 70.931 17.3812C70.9781 17.2678 71.0023 17.1462 71.0023 17.0234C71.0023 16.9007 70.9781 16.7791 70.931 16.6657C70.884 16.5523 70.815 16.4492 70.7281 16.3625L55.1469 0.771875C54.9688 0.59375 54.7344 0.5 54.4812 0.5C54.2281 0.5 53.9938 0.59375 53.8156 0.771875L14.075 40.5125C13.9344 40.6531 13.85 40.8219 13.8125 41.0094L11.0469 56.7781C10.9557 57.2804 10.9883 57.7972 11.1418 58.284C11.2954 58.7708 11.5653 59.2129 11.9281 59.5719C12.5469 60.1719 13.325 60.5 14.1594 60.5V60.5Z"
                      fill="white"
                    />
                  </svg>
          </div>
          </div>
        </div>
        <div className="flex my-7 md:space-x-5 space-x-2">
          <input
            type="checkbox"
            className="default:ring-2 w-6 h-6  rounded-2xl"
            onClick={ClickedCheckbox}
          />
          <p className="text-[#434343] text-lg leading-7 font-normal">
            Part of an event/group
          </p>
        </div>
        {checkBox === true && (
          <>
            <div className=" relative md:max-w-[29rem]">
              <p
                className="mt-2 border rounded-2xl p-4 opacity-60 mb-4 text-[#010101]"
                onClick={ShowDropdown}
              >
                Select the event
              </p>
              {dropdown ? (
                <p
                  className="absolute right-6 top-1/3 text-xs cursor-pointer  text-[#6C6C6C] transform rotate-180"
                  onClick={ShowDropdown}
                >
                  &#9660;
                </p>
              ) : (
                <p
                  className="absolute right-6 top-[37%] text-xs cursor-pointer  text-[#6C6C6C]  "
                  onClick={ShowDropdown}
                >
                  &#9660;
                </p>
              )}
              {dropdown && (
                <l1 className=" absolute top-16 left-2  shadow-2xl bg-[#DEE4E7] w-full text-lg text-[#010101] leading-7 opacity-60 text-center py-1 font-normal z-10 cursor-pointer">
                  GirlScript Summer of Code
                </l1>
              )}
            </div>
            <p className="text-[#7B7B7B] md:mb-2 md:mt-1 md:ml-2">
              or create new event/group
            </p>
            <div className="md:grid md:grid-cols-3 ">
              <div className="flex flex-col col-span-2 md:mr-12">
                <input
                  placeholder="Event Name"
                  className="mt-2 border rounded-2xl p-4 mb-4 text-[#010101] "
                />
                <textarea
                  placeholder="Event Description"
                  className="mt-3 mb-8 border rounded-2xl p-4 text-[#010101] md:h-40 md:min-h-fit"
                />
              </div>
              <div className="md:block cursor-pointer relative  ">
                <div className="md:w-[270px] md:h-[276px] w-[200px] h-[200px] relative mx-auto mb-10">
                  <Image
                    src="/assests/img2.jpg"
                    layout="fill"
                    alt="Alt image"
                  />
                </div>
                <div className="absolute  md:bottom-[17vw] md:right-[9vw] xl:top-[38%] lg:left-[40%] lg:top-[20%] bottom-[35%] right-[45%]  ">
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 76 76"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M72.5 68.375H3.5C1.84062 68.375 0.5 69.7156 0.5 71.375V74.75C0.5 75.1625 0.8375 75.5 1.25 75.5H74.75C75.1625 75.5 75.5 75.1625 75.5 74.75V71.375C75.5 69.7156 74.1594 68.375 72.5 68.375ZM14.1594 60.5C14.3469 60.5 14.5344 60.4813 14.7219 60.4531L30.4906 57.6875C30.6781 57.65 30.8563 57.5656 30.9875 57.425L70.7281 17.6844C70.815 17.5976 70.884 17.4946 70.931 17.3812C70.9781 17.2678 71.0023 17.1462 71.0023 17.0234C71.0023 16.9007 70.9781 16.7791 70.931 16.6657C70.884 16.5523 70.815 16.4492 70.7281 16.3625L55.1469 0.771875C54.9688 0.59375 54.7344 0.5 54.4812 0.5C54.2281 0.5 53.9938 0.59375 53.8156 0.771875L14.075 40.5125C13.9344 40.6531 13.85 40.8219 13.8125 41.0094L11.0469 56.7781C10.9557 57.2804 10.9883 57.7972 11.1418 58.284C11.2954 58.7708 11.5653 59.2129 11.9281 59.5719C12.5469 60.1719 13.325 60.5 14.1594 60.5V60.5Z"
                      fill="white"
                    />
                  </svg>
                </div>
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
        {fileUrl && (
          <img
            className="rounded mt-4"
            width="350"
            src={fileUrl}
            alt="fileLoading"
          />
        )}
        <button
          onClick={createCertificate}
          className="font-bold  bg-[#4A3CED] text-white py-5 text-xs  text-center shadow-lg md:w-[18.5%] rounded-lg   "
        >
          Create
        </button>
      </div>
    </div>
  );
}
