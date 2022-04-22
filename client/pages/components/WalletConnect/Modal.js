import React, { useState } from "react";

import Image from 'next/image'
import Router from 'next/router'

import metamaskLogo from '../../../public/metamask.png'
import WalletConnectLogo from '../../../public/walletconnect.png'
import { useMoralis } from "react-moralis";
import Moralis from "moralis";

const Modal = ({ org, ind }) => {
  const {  isAuthenticated ,isWeb3Enabled,enableWeb3 } = useMoralis()
  
  const initialUser = Moralis.User.current();
  const [user, setUser] = useState(initialUser);

  const onLoginWalletConnect = async () => {
    try {
      const user = await Moralis.authenticate({ provider: "walletconnect" });

      setUser(user);
      if (org) {
        if (isAuthenticated) {
          Router.push("/home");
        }
      }
      if (ind) {
        if (isAuthenticated) {
          Router.push("/my-certificates");
        }
      }
    } catch (err) {
      alert("Something went wrong!")
    };
    
      if(!isWeb3Enabled && isAuthenticated){
        enableWeb3({provider:"walletconnect"});
        console.log("web3 activated");
      }
    
  };
  const onLoginMetamask = async () => {
    try {
      const user = await Moralis.authenticate();
      setUser(user);
      if (org) {
        if ( isAuthenticated) {
          Router.push("/home");
        }
      }
      if (ind) {
        if (isAuthenticated) {
          Router.push("/my-certificates");
        }
      }
    } catch (err) {
      alert("Someting went wrong!")
    };
    if(!isWeb3Enabled && isAuthenticated){
      enableWeb3();
      console.log("web3 activated");
    }

  };
  

  return (
    <div className="fixed inset-0 bg-[#1f1e1e] bg-opacity-50 flex justify-center z-10 items-center h-full w-full">
      <div className="w-[754px] h-[462px] shadow-lg bg-[#FAFAFA]  flex flex-col p-[25px] rounded-[61px] ">
        <div className=" grid place-items-center pt-4">
          <h3 className="font-sans font-bold text-2xl">Wallet Connect</h3>
        </div>
        <div className="py-2  grid place-items-center">
          <div className="w-[35px] h-[6px] border-4 rounded-md border-black divide-x-4"></div>

        </div>
        <div className="flex flex-row pt-[60px] p-6 pl-[151px] space-x-10 " >
          <div className="h-[185px] w-[181px]  bg-[#F3F3F3] rounded-[19px] ">
            <div className="pt-[36px] pl-[46px] cursor-pointer transform motion-safe:hover:scale-110">
              <button onClick={onLoginMetamask}>
                <Image
                  src={metamaskLogo}
                  width="88.85px"
                  height="80.45px"
                /></button>
            </div>
            <div className="font-sans font-bold pl-[57px] text-sm pt-1"> Metamask</div>
          </div>
          <div className="h-[185px] w-[181px]  bg-[#F3F3F3] rounded-[19px] ">
            <div className="pt-[36px] pl-[46px] cursor-pointer transform motion-safe:hover:scale-110">
              <button onClick={onLoginWalletConnect} >
                <Image
                  src={WalletConnectLogo}
                  width="90px"
                  height="80.45px"
                /></button>
            </div>
            <div className="font-sans font-bold pl-[42px] text-sm pt-1">Wallet Connect</div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Modal