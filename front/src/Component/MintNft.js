import './Wallet/css/MintNft.css';
// import React, { useState } from 'react';
import mintNFT from "../scripts/mint-Nft";

/// Le wallet utiliser ici n'est pas celui de l'user
export default function Mint (props) {

    async function getNFT() {
        try {
            let formdata = new FormData();
            formdata.append("uri", props.img.uri);
            formdata.append("name", props.img.name);
            let requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                cache: 'no-cache',
            };

            let res = await fetch("http://localhost:8080/api/create", requestOptions)
            let json = await res.json()

            // if (res.status === 200 && json.jsonHash && json.imageHash) {
            //     if (await mintNFT(json.jsonHash, props.metamaskAddrs)) {
            //         props.setUrl(json.imageHash);
            //     }
            // } else {
            //     console.log("Error")
            //     alert("Error")
            // }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div> <button className={"Button"} onClick={getNFT}>Send</button> </div>
        </div>
    );
}
