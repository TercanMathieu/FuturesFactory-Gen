import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { DAppProvider } from "@usedapp/core";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <DAppProvider config={{}}>

      <App />
      </DAppProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
