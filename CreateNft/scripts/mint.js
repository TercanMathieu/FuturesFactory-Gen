require('dotenv').config();
const API_URL = "https://eth-ropsten.alchemyapi.io/v2/vd2d5v4G2XxM9KWdsoXT9Sp5W4pZWKwA";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
// const contract = require("../artifacts/contracts/MyNFT.sol/FuturesFactory.json");
// const contract = require("../asstet/FuturesFactory.json");
const contractAddress = "0x014682a675C3689bD165E4d25E3005F59A822D92";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount("0x21e0da8FD54e2695D0a542699Cc92B22ed486C20", 'latest'); //get latest nonce

    const tx = {
        'from': "0x21e0da8FD54e2695D0a542699Cc92B22ed486C20",
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'maxPriorityFeePerGas': 1999999987,
        'data': nftContract.methods.mintNFT("0x21e0da8FD54e2695D0a542699Cc92B22ed486C20", tokenURI).encodeABI()
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, "3cb9607b3d1c212808c5bfcad0560abb888364c20c135812ae8bc2943f7c034e");
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

// mintNFT("https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP");
