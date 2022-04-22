const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTTransfer", function () {
  it("Should create and transfer certificate", async function () {


    const NFTTransfer = await ethers.getContractFactory("NFTTransfer");
    const nftTransfer = await NFTTransfer.deploy();
    await nftTransfer.deployed();
    const nftTransferAddress = nftTransfer.address; //Getting the Market Address

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(nftTransferAddress);
    await nft.deployed();
    const nftContractAddress = nft.address; // Getting the NFT address

    let listingPrice = await nftTransfer.getListingPrice();
    listingPrice = listingPrice.toString(); // Getting the Listing Price of the NFT

    //Create The NFTs (3 nfts here);
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");
    await nft.createToken("https://www.mytokenlocation3.com");

    // Put the NFTs on Sale
    await nftTransfer.createCertificate(nftContractAddress, 1,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 2,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 3,{ value: listingPrice });

    // Get Some TestNet Buyers
    const [_, buyersAddress, add1] = await ethers.getSigners();

    // Transfering the NFT
    await nftTransfer.connect(buyersAddress).transferCertificate(nftContractAddress, 1, add1.address);
    await nftTransfer.connect(add1).transferCertificate(nftContractAddress, 2, buyersAddress.address);

    items = await nftTransfer.fetchMyCertificates();

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item;
    }))

    console.log('items: ', items);

  })
})

describe("Test2", function () {
  it("Should print the certificates of add1", async function () {

    const NFTTransfer = await ethers.getContractFactory("NFTTransfer");
    const nftTransfer = await NFTTransfer.deploy();
    await nftTransfer.deployed();
    const nftTransferAddress = nftTransfer.address; //Getting the Market Address

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(nftTransferAddress);
    await nft.deployed();
    const nftContractAddress = nft.address; // Getting the NFT address

    let listingPrice = await nftTransfer.getListingPrice();
    listingPrice = listingPrice.toString(); // Getting the Listing Price of the NFT

    //Create The NFTs (3 nfts here);
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");
    await nft.createToken("https://www.mytokenlocation3.com");

    // Put the NFTs on Sale
    await nftTransfer.createCertificate(nftContractAddress, 1,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 2,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 3,{ value: listingPrice });

    // Get Some TestNet Buyers
    const [_, buyersAddress, add1] = await ethers.getSigners();

    // Transfering the NFT
    await nftTransfer.connect(buyersAddress).transferCertificate(nftContractAddress, 1, add1.address);
    await nftTransfer.connect(add1).transferCertificate(nftContractAddress, 2, buyersAddress.address);

    items = await nftTransfer.connect(add1).fetchMyCertificates();

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item;
    }))

    console.log('items: ', items);

  })
})

describe("Test3", function () {
  it("Should print the certificates of buyersAddress", async function () {

    const NFTTransfer = await ethers.getContractFactory("NFTTransfer");
    const nftTransfer = await NFTTransfer.deploy();
    await nftTransfer.deployed();
    const nftTransferAddress = nftTransfer.address; //Getting the Market Address

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(nftTransferAddress);
    await nft.deployed();
    const nftContractAddress = nft.address; // Getting the NFT address

    let listingPrice = await nftTransfer.getListingPrice();
    listingPrice = listingPrice.toString(); // Getting the Listing Price of the NFT

    //Create The NFTs (3 nfts here);
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");
    await nft.createToken("https://www.mytokenlocation3.com");

    // Put the NFTs on Sale
    await nftTransfer.createCertificate(nftContractAddress, 1,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 2,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 3,{ value: listingPrice });

    // Get Some TestNet Buyers
    const [_, buyersAddress, add1] = await ethers.getSigners();

    // Transfering the NFT
    await nftTransfer.connect(buyersAddress).transferCertificate(nftContractAddress, 1, add1.address);
    await nftTransfer.connect(add1).transferCertificate(nftContractAddress, 2, buyersAddress.address);

    items = await nftTransfer.connect(buyersAddress).fetchMyCertificates();

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item;
    }))

    console.log('items: ', items);

  })
})

describe("Test4", function () {
  it("Should print the certificates created", async function () {

    const NFTTransfer = await ethers.getContractFactory("NFTTransfer");
    const nftTransfer = await NFTTransfer.deploy();
    await nftTransfer.deployed();
    const nftTransferAddress = nftTransfer.address; //Getting the Market Address

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(nftTransferAddress);
    await nft.deployed();
    const nftContractAddress = nft.address; // Getting the NFT address

    let listingPrice = await nftTransfer.getListingPrice();
    listingPrice = listingPrice.toString(); // Getting the Listing Price of the NFT

    //Create The NFTs (3 nfts here);
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");
    await nft.createToken("https://www.mytokenlocation3.com");

    // Put the NFTs on Sale
    await nftTransfer.createCertificate(nftContractAddress, 1,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 2,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 3,{ value: listingPrice });

    // Get Some TestNet Buyers
    const [_, buyersAddress, add1] = await ethers.getSigners();

    // Transfering the NFT
    await nftTransfer.connect(buyersAddress).transferCertificate(nftContractAddress, 1, add1.address);
    await nftTransfer.connect(add1).transferCertificate(nftContractAddress, 2, buyersAddress.address);

    items = await nftTransfer.fetchCertificatesCreated();

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item;
    }))

    console.log('items: ', items);

  })
})

describe("Test5", function () {
  it("Should print the certificates left to transfer", async function () {

    const NFTTransfer = await ethers.getContractFactory("NFTTransfer");
    const nftTransfer = await NFTTransfer.deploy();
    await nftTransfer.deployed();
    const nftTransferAddress = nftTransfer.address; //Getting the Market Address

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(nftTransferAddress);
    await nft.deployed();
    const nftContractAddress = nft.address; // Getting the NFT address

    let listingPrice = await nftTransfer.getListingPrice();
    listingPrice = listingPrice.toString(); // Getting the Listing Price of the NFT

    //Create The NFTs (3 nfts here);
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");
    await nft.createToken("https://www.mytokenlocation3.com");

    // Put the NFTs on Sale
    await nftTransfer.createCertificate(nftContractAddress, 1,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 2,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 3,{ value: listingPrice });

    // Get Some TestNet Buyers
    const [_, buyersAddress, add1] = await ethers.getSigners();

    // Transfering the NFT
    await nftTransfer.connect(buyersAddress).transferCertificate(nftContractAddress, 1, add1.address);
    await nftTransfer.connect(add1).transferCertificate(nftContractAddress, 2, buyersAddress.address);

    items = await nftTransfer.fetchCertificatesLeft();

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item;
    }))

    console.log('items: ', items);

  })
})

describe("Test6", function () {
  it("Should print the certificates transferred", async function () {

    const NFTTransfer = await ethers.getContractFactory("NFTTransfer");
    const nftTransfer = await NFTTransfer.deploy();
    await nftTransfer.deployed();
    const nftTransferAddress = nftTransfer.address; //Getting the Market Address

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(nftTransferAddress);
    await nft.deployed();
    const nftContractAddress = nft.address; // Getting the NFT address

    let listingPrice = await nftTransfer.getListingPrice();
    listingPrice = listingPrice.toString(); // Getting the Listing Price of the NFT

    //Create The NFTs (3 nfts here);
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");
    await nft.createToken("https://www.mytokenlocation3.com");

    // Put the NFTs on Sale
    await nftTransfer.createCertificate(nftContractAddress, 1,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 2,{ value: listingPrice });
    await nftTransfer.createCertificate(nftContractAddress, 3,{ value: listingPrice });

    // Get Some TestNet Buyers
    const [_, buyersAddress, add1] = await ethers.getSigners();

    // Transfering the NFT
    await nftTransfer.connect(buyersAddress).transferCertificate(nftContractAddress, 1, add1.address);
    await nftTransfer.connect(add1).transferCertificate(nftContractAddress, 2, buyersAddress.address);

    items = await nftTransfer.fetchCertificatesTransferred();

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item;
    }))

    console.log('items: ', items);

  })
})
