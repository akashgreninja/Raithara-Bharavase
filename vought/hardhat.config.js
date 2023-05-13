require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // goerli: {
    //   url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
    //   chainId: 5,
    //   accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    // },
    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_API_KEY}`,
    //   accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    // },
  },
};
