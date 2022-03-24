import './css/App.css';
import React from 'react';
import SearchNft from "./Component/Wallet/searchNft";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./Component/header";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    {/*<Route path="/home" element={Home} />*/}
                    <Route path="Buy" element={<SearchNft/>} />
                    {/*<Route path="/" element={<MintNft/>} />/>*/}
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
