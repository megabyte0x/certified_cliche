require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();
const projectId = "3563bdf92c4890518396bd186677a6bc37e727f3";


module.exports = {
  networks:{
    hardhat:{
      chainId:1337,

    },
    mumbai:{
      url:`https://rpc-mumbai.maticvigil.com/v1/${projectId}`,
      accounts : [privateKey]
    },
    mainnet:{
      url:`https://rpc-mainnet.maticvigil.com/v1/${projectId}`,
      accounts : [privateKey]
    }
  },
  solidity: "0.8.4",
};
