import React from "react";

const NFTCard = () => {
  return (
    <div>
      <div className=" w-[261px] h-[318px] border-[1px] rounded-3xl border-[#C5C5C5] mx-20">
        <img
          src="https://static01.nyt.com/images/2021/03/12/arts/11nft-auction-cryptopunks-print/11nft-auction-cryptopunks-print-mobileMasterAt3x.jpg"
          className="rounded-t-3xl w-[261px] h-[246px]"
        />
        <div className="py-2 px-6">
          <p className="text-lg font-semibold">Dummy name </p>
          <p className="text-sm mt-1">
            Lorem ipsum dolor sit.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
