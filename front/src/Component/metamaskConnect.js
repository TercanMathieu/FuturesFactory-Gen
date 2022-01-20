
import React from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import DisplayNFT from "./Wallet/displayNFT";

export default function ConnectButton() {
    const {activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    function handleConnectWallet() {
        activateBrowserWallet();
        console.log(account, etherBalance)
    }

    return (
        <div className="connect-button">
            <button
                className="button"
                onClick={handleConnectWallet}
                disabled={etherBalance}
            >
                {etherBalance ? "Loading..." : "Connect Wallet"}
            </button>
    <DisplayNFT></DisplayNFT>
        </div>
    )
}
