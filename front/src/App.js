import './App.css';
import MetamaskConnect from './Component/metamaskConnect';
import {Web3ReactProvider} from '@web3-react/core'
import Web3 from 'web3'


function getLibrary(provider) {
  return new Web3(provider)
}
const App = () => {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskConnect></MetamaskConnect>
      </Web3ReactProvider>
  );
}

export default App;
