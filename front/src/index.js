import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { DAppProvider } from "@usedapp/core";
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "./store/store";
console.log(new Date());
ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider>
        <DAppProvider config={{}}>
            <App />
        </DAppProvider>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
