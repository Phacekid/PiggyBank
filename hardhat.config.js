require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  etherscan: {
    apiKey: process.env.etherscan_key,
  },

  networks: {
    sepolia: {
      url: process.env.infura_link,
      accounts: [process.env.private_key],
    },
  }
};
