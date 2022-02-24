# <a href="https://certified-cliche.vercel.app/">Certified-Cliché</a>

### `Uniqueness with Authenticity.`

<a href="https://www.youtube.com/watch?v=rJpA7ulK2rQ" target="_blank" >
 <img src = "https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"><img/>
</a>


<br>

# Project Description

## Problem Description

Today the authenticity of online certificates has fallen due to practices like forging, editing, etc. therefore they have lost their uniqueness.

We all have done some courses or worked in companies etc, and we get the certificates for the same, this is one of the rewards we get from the hard work. But how would you feel if someone get all those certificates without doing hard work and only by editing them? And to prevent this from happening anymore we built
`Certified Cliché`.

<hr>

## Solution

Certified-Cliché, is a platform that will get the authenticity of the CERTIFICATES to the highest level.

The idea is to provide a platform where the Institutions, Organisations, or anyone who provides certificates will convert it into the NFT or store it in an NFT.
That will make their certificate authentic, and then they can transfer it to the applicant. On the other hand, applicants can check all of their certificates, or NFTs they received now, and then they may showcase them to the other platforms.

Our idea is unique in itself as it restores the uniqueness and authenticity of Certificates by storing them as or in as NFT and making them more valuable.

<br>

# How to Run

## Prerequisites

<br>

### Metamask Installed as extension in your Browser.
### Nodejs Installed in your system.
### Knowledge of Git and GitHub

<br>

## Intialization

<br>

### Give the repo a Star and Fork it.

<br>

### Clone the repo in a directory.

```
git clone https://github.com/${GitHub Username}/certified_cliche.git
```

<br>

### Open Terminal on the Folder

<br>

### Go the the client directory

```
cd client
```

<br>

### Install the Dependencies

```
npm install
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

<br>

### Switch to the CONTRACT directory

```
cd ..
cd CONTRACT
```

<br>

### Install the Dependencies

```
npm install
```

<br>

## [On LocalHost]

### Open the terminal in the CONTRACT directory

<br>

### Deploy the contract on the LocalHost

```
npx hardhat run scripts/deploy.js
```

<br>

### Copy the `NFT CONTRACT ADDRESS` and the `NFT TRANSFER ADDRESS`, and paste them in the `CONTRACT/config.js`

<br>

### Run the Nodes

```
npx hardhat nodes
```

<br>

### Open New Terminal on the `client` folder.

<br>

### Uncomment the LocalHost provider

```
 For the LocalHost
 const provider = new ethers.providers.JsonRpcProvider();
```

<br>

### Copy the `NFT.json` from

```
CONTRACT/artifacts/contracts/NFT.sol/NFT.json
```

### and replace it with the

```
client/abi/NFT.json
```

<br>

### Copy the `NFTTransfer.json` from

```
CONTRACT/artifacts/contracts/NFTTransfer.sol/NFTTransfer.json
```

### and replace it with the

```
client/abi/NFTTransfer.json
```

<br>

### Set the Metamask Network to LocalHost

<br>

### Run the UI

```
npm run dev
```

<br>

## [On Polygon Mumbai Testnet]

### Get the Polygon Mumbai Testnet `RPC URL` from the providers.

For Example => Infura, MaticVigil

<br>

### Copy the `Project Id` from the RPC URL Provider and paste it in CONTRACT/hardhat.config.js

```
mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/v1/${projectID}`,
      accounts: [prvKey]
    }
```

<br>

### Paste the RPC URL in the CONTRACT/config.js

```
export const rpc_url = `rpcUrl`;
```

<br>

### Get a wallet where you have Mumbai Testnet Tokens for deployment and other work around.

You can get them by using a demo wallet and requesting through `Polygon Faucet`.

<br>

### Paste the Wallet Private Key into the `CONTRACT/hardhat.config.js`

```
const prvKey = 'privateKey'
```

<br>

### Deploy the Contract on the Polygon Mumbai Testnet

```
npx hardhat run CONTRACT/scripts/deploy.js --mumbai
```

<br>

### Copy the `NFT CONTRACT ADDRESS` and the `NFT TRANSFER ADDRESS`, and paste them in the `CONTRACT/config.js`

<br>

### Open New Terminal on the `client` folder.

<br>

### Uncomment the Mumbai Testnet provider

```
For the Mumbai Testnet
const provider = new ethers.providers.JsonRpcProvider(rpc_url);
```

<br>

### Copy the `NFT.json` from

```
CONTRACT/artifacts/contracts/NFT.sol/NFT.json
```

### and replace it with the

```
client/abi/NFT.json
```

<br>

### Copy the `NFTTransfer.json` from

```
CONTRACT/artifacts/contracts/NFTTransfer.sol/NFTTransfer.json
```

### and replace it with the

```
client/abi/NFTTransfer.json
```

<br>

### <a href="https://blog.pods.finance/guide-connecting-mumbai-testnet-to-your-metamask-87978071aca8">Add the RPC URL in your Metamask</a>

<br>

### Run the UI

```
npm run dev
```

<br>
<br>

*Currently it is deployed on the Polygon Mumbai-Testnet.

*Make Pull Request on Dev Branch Only

<br>

<div align="center">
<h2>For Any Queries</h2>
<a href="https://t.me/+kJl1BmcgYfo2YzM1"><img alt="TF" src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white"/> </a>
</div>

<br>
<br>

<div align="center"> 
<h2>Project Created by </h2>

<h1 align="center">

<a href="https://www.linkedin.com/in/angshuman-barpujari-26504016b/">Angshuman Barpujari</a>

<a href="https://www.linkedin.com/in/yash-garg-megabyte/"> Yash Garg</a>

</h1>

</div>
