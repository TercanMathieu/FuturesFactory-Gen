require('dotenv').config();

const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const contractAddress = '0x4942a5403c17530fa2668467ff43a7bd47177b4b';
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'maxPriorityFeePerGas': 1999999987,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`)
}
console.log(JSON.stringify(contract.abi));

mintNFT("https://gateway.pinata.cloud/ipfs/QmeBXvDERy3oPfN1ZsvVy3CXLpUvjfG8vKNEyB8GgrDi2E");
