require('dotenv').config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const contract = require("./asset/contracts/FuturesFactory.json");
const web3 = createAlchemyWeb3("https://eth-ropsten.alchemyapi.io/v2/" + process.env.ALCHEMY_KEY);

const PUBLIC_KEY = process.env.METAMASK_ADDRS;
const PRIVATE_KEY = process.env.PV_METAMASK_ADDRS;
const contractAddress = process.env.CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

exports.mintNFT = async function (tokenURI, owner) {
    try {
        console.log("Minting")
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

        const tx = {
            'from': owner,
            'to': contractAddress,
            'nonce': nonce,
            'gas': 500000,
            'maxPriorityFeePerGas': 1999999987,
            'data': nftContract.methods.mintNFT(owner, tokenURI).encodeABI()
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
        return (transactionReceipt.status)
    } catch (e) {
        console.log(e)
    }
}
