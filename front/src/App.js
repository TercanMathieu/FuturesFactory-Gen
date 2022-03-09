import './css/App.css';
import {Web3ReactProvider} from '@web3-react/core'
import Web3 from 'web3'
import React, { useState } from 'react';
import ConnectButton from "./Component/Wallet/metamaskConnect";
import SearchNft from "./Component/Wallet/searchNft";
import MintNft from "./Component/MintNft";

function getLibrary(provider) {
  return new Web3(provider)
}
// <Web3ReactProvider getLibrary={getLibrary}>
// </Web3ReactProvider>
const App = () => {
    const [img, setImg] = useState("")
    const [metamask, setMetamask] = useState(null);
    const [url, setUrl] = useState("")

  return metamask ?  (
      <div className="container">
          { !url ? <SearchNft metamaskAddrs={metamask} setImg={setImg}/> : null }
          { img && !url? <MintNft img={img} setUrl={setUrl}  metamaskAddrs={metamask}/> : null }
         <img src={url}  alt=""/>
      </div>
  ) : (
      <div className="container">
          <Web3ReactProvider getLibrary={getLibrary}>
              <ConnectButton function={setMetamask}/>
          </Web3ReactProvider>
      </div>
  )
}

export default App;
