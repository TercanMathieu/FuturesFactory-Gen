import './css/App.css';
import {Web3ReactProvider} from '@web3-react/core'
import Web3 from 'web3'
import React, { useState } from 'react';
import ConnectButton from "./Component/metamaskConnect";
import Display from "./Component/Wallet/displayNFT"

function getLibrary(provider) {
  return new Web3(provider)
}
// <Web3ReactProvider getLibrary={getLibrary}>
// </Web3ReactProvider>

const App = () => {
    const [metamask, setMetaask] = useState("");

  return !metamask ?  (
      <div className="container">
           <Web3ReactProvider getLibrary={getLibrary}>
                <ConnectButton function={setMetaask} metamaskAddrs={metamask}/>
           </Web3ReactProvider>
      </div>
  ) : (
      <div className="container">
        <Display/>
      </div>
  )

}

export default App;
