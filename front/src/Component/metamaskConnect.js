import { useWeb3React } from "@web3-react/core";
import { injected } from "./Wallet/connector";
import Web3 from 'web3'
import DisplayNFT from "./Wallet/displayNFT";
const Web3EthContract = require('web3-eth-contract');
const url = "https://eth-mainnet.alchemyapi.io/v2/uOzZFEBi8Egx4iiodz805ZVzeDnVs3PJ";

const web3 = new Web3(new Web3.providers.HttpProvider(url));
// web3.setProvider(new Web3.providers.WebsocketProvider(url));

export default function MetamaskConnect () {

const {active, account, library, connector, activate, deactivate} = useWeb3React()
// let buns = null;

    async function connect() {
        try {
            await activate(injected)
        } catch(e) {
            console.log(e)
        }
    }

    async function disconnect() {
        try {
            deactivate(injected)
        } catch(e) {
            console.log(e)
        }
    }

    // async function readAccountEtherValue(address) {
    //     let  balance = await web3.eth.getBalance(address);
    //     return web3.utils.fromWei(balance, "noether");
    // // }
    // async function getBunGenesis(test) {
    //     const contract = require("../asset/contracts/json.json");
    //     const contractAddress = "0x549d03e7372bb0bf9109833e0e8a2143c439d19c";
    //     const nftContract = new web3.eth.Contract(contract, contractAddress);
    //
    //     const bun = await nftContract.methods.walletOfOwner("0x93F7260304320B5734AcFca524eD52F86f9B43A3").call();
    //
    //     console.log(account)
    // }

    return (

        <div>
            <button onClick={connect}> Connect to metamask</button>
            {active ? <span>connected with <b>{account}</b> </span>:<span> Not connected</span> }
            <button onClick={disconnect}> disconnect</button>
            {/*<button onClick={getBunGenesis}> lib</button>*/}
            <DisplayNFT account={account}></DisplayNFT>
        </div>
    );
}
