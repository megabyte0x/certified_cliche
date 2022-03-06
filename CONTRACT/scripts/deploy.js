const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Deployer Address
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  let txHash, txReceipt
  const NFTTransfer = await hre.ethers.getContractFactory("NFTTransfer");
  const nftTransfer = await NFTTransfer.deploy();
  await nftTransfer.deployed();

  txHash = nftTransfer.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let nftTransferAddress = txReceipt.contractAddress

  // NFT Transfer Contract Address
  console.log("nftTransferAddress:", nftTransferAddress);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftTransferAddress);
  await nft.deployed();


  txHash = nft.deployTransaction.hash;
  // console.log(`NFT hash: ${txHash}\nWaiting for transaction to be mined...`);
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let nftAddress = txReceipt.contractAddress

  // NFT Contract Address
  console.log("nftAddress:", nftAddress);
  
  let data1 = "export const nftAddress = " + JSON.stringify(nftAddress) + ";\n"
  let data2 = "export const nftTransferAddress = " + JSON.stringify(nftTransferAddress) + ";\n"
  let data3 = "export const rpc_url = `https://rpc-mumbai.maticvigil.com/v1/3563bdf92c4890518396bd186677a6bc37e727f3`;"
  
  fs.writeFileSync('config.js', data1 + data2 + data3, (err) => {
    if(err) throw err;
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
