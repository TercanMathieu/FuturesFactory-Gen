require('dotenv').config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const contract = require("../asset/contracts/FuturesFactory.json");
const web3 = createAlchemyWeb3("https://eth-ropsten.alchemyapi.io/v2/" + process.env.REACT_APP_ALCHEMY_KEY);

const PUBLIC_KEY = process.env.REACT_APP_PUB_METAMASK_ADDRS;
const PRIVATE_KEY = process.env.REACT_APP_PV_METAMASK_ADDRS;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

console.log(JSON.stringify(contract.abi));
async function mintNFT(tokenURI, owner) {
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
    return (transactionReceipt.status)// If transaction is mined send true else false
}
export default mintNFT;
