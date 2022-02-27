const hre = require("hardhat");

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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });