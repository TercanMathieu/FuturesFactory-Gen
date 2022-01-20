/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL } = process.env;
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/vd2d5v4G2XxM9KWdsoXT9Sp5W4pZWKwA",
      accounts: ["0x3cb9607b3d1c212808c5bfcad0560abb888364c20c135812ae8bc2943f7c034e"]
    }
  },
}
