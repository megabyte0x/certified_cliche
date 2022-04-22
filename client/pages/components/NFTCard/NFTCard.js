import React from "react";

const NFTCard = ({key, nftImage, nftName, nftDesciption}) => {
  return (
    <div key={key}>
      <div className=" w-[261px] h-[318px] border-[1px] rounded-3xl border-[#C5C5C5] mx-20">
        <img
          src={nftImage}
          alt={nftName}
          className="rounded-t-3xl object-cover h-[246px]"
        />
        <div className="py-2 px-6">
          <p className="text-lg font-semibold">{nftName} </p>
          <p className="text-sm mt-1">
            {nftDesciption}.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
