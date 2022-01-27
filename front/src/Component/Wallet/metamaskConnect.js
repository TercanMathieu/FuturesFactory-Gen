import { useEthers } from "@usedapp/core"; // Add "useEtherBalance"

export default function ConnectButton(props) {
    const { activateBrowserWallet, account } = useEthers();
    // const etherBalance = useEtherBalance(account); // Get the balance of the account

    function handleConnectWallet() {
        activateBrowserWallet();
        props.function(account)
    }

    return (
        <button onClick={handleConnectWallet}>Connect to a wallet</button>
    );
}
