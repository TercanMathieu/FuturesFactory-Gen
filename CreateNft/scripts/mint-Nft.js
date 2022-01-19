require('dotenv').config();
const API_URL = "https://eth-ropsten.alchemyapi.io/v2/uOzZFEBi8Egx4iiodz805ZVzeDnVs3PJ";
const PUBLIC_KEY = "0x21e0da8FD54e2695D0a542699Cc92B22ed486C20";
const PRIVATE_KEY = "3cb9607b3d1c212808c5bfcad0560abb888364c20c135812ae8bc2943f7c034e";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0xeeba04ff43d8fb94f3ccd1b04937c4664326bf63";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI, owner) {
    const nonce = await web3.eth.getTransactionCount("0x21e0da8FD54e2695D0a542699Cc92B22ed486C20", 'latest'); //get latest nonce
    console.log(nonce)
    console.log("contract:",contract.abi)
    const tx = {
        'from': owner,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'maxPriorityFeePerGas': 1999999987,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, "https://gateway.pinata.cloud/ipfs/QmSTwfXxypbNvEfuyhHNha5ovpyo8YH2iHUroZj9ievqpE").encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    console.log(signedTx)
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}
mintNFT("https://gateway.pinata.cloud/ipfs/QmSTwfXxypbNvEfuyhHNha5ovpyo8YH2iHUroZj9ievqpE", "0x21e0da8FD54e2695D0a542699Cc92B22ed486C20");

