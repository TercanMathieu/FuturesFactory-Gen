import './css/MintNft.css';
import React, { useState } from 'react';
// import mintNFT from "../../scripts/mint-Nft";

/// Le wallet utiliser ici n'est pas celui de l'user
export default function SearchNft (props) {
    const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
    let [imageDiv, setImages] = useState([]);
    const images = [];

    async function getImageNft(NFTs) {
        try {
            for (let i = 0; NFTs[i]; i++) {
                let result = await fetch('https://eth-mainnet.g.alchemy.com/' + alchemyKey + '/v1/getNFTMetadata?contractAddress=' + NFTs[i].contract.address + '&tokenId=' + NFTs[i].id.tokenId)
                let NFT = await result.json()

                let res = await fetch(NFT.metadata.image).catch(err => {
                    console.log('DEBUG - Error: ' + err.message);
                })
                if (NFT.metadata.image && res) {

                    res = await res.text()
                    if (!res.startsWith("GIF")) {
                        images.push({uri: NFT.metadata.image, name: NFT.metadata.name})
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function searchNft() {
        try {
            console.log("Search nft's")
            /* use the metamask addrs  */  const result = await fetch('https://eth-mainnet.g.alchemy.com/' + alchemyKey + '/v1/getNFTs/?owner=0xcE68e215821ed8e0b31b3227AFb9D019650080c5\n')
            const NFTs = await result.json();
            await getImageNft(NFTs.ownedNfts);

            imageDiv = images.map((img, k) => <button id={k}><img onError={({currentTarget}) => {
                    currentTarget.onerror = null; // prevents looping
                    document.getElementById(k).remove()
                }} className={"image"} k={k} src={img.uri} alt="Images" onClick={() => {props.setImg(img)}}/></button>
            );
            setImages(imageDiv)
        } catch (e) {
            console.log(e)
        }
    }

    return  (
        <div>
            <button className={"Button"} onClick={searchNft}>search NFT</button>
            <div>
                {imageDiv}
            </div>
        </div>
    );
}
