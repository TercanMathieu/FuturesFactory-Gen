import './css/MintNft.css';
import React, { useState } from 'react';
require('dotenv').config()

// import mintNFT from "../../scripts/mint-Nft";

export default function SearchNft (props) {

    const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
    let [imageDiv, setImages] = useState([]);
    let images = [];

    function fixIpfsLink (link) {
        // https://ipfs.io/ipfs/ipfs/QmRpsg75qkjQeroTZkpMNcYDh7zUU7sF6vgMxU6tnpHqjp/image.png
        //ipfs://ipfs/QmRpsg75qkjQeroTZkpMNcYDh7zUU7sF6vgMxU6tnpHqjp/image.png
       // ipfs://QmVgqoKfvkCZp4iDer2CzVEUAp2pTWFKUPTfw1gYCnfH15/889.jpg
    if (link && link.startsWith("ipfs://ipfs")) {
        let ipfsLink = link.split("//")
        console.log("https://ipfs.io/" + ipfsLink[1])
        return "https://ipfs.io/" + ipfsLink[1]
    } else if (link && link.startsWith("ipfs")) {
            if (link.includes("QmRpsg75qkjQeroTZkpMNcYDh7zUU7sF6vgMxU6tnpHqjp")) {
                console.log("Gros test", link)
            }
            let ipfsLink = link.split("//")
           return "https://ipfs.io/ipfs/" + ipfsLink[1]
        }
        else
            return link
    }

  async function sortLink(NFT) {
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

    function displayImages() {
        imageDiv = images.map((img, k) => <button id={k}><img onError={({currentTarget}) => {
                currentTarget.onerror = null; // prevents looping
                document.getElementById(k).remove()
            }} className={"image"} src={img.uri} alt="Images" onClick={() => {props.setImg(img)}}/></button> //
        );
        setImages(imageDiv)
    }

    async function displayNFT() {
        try {
            console.log("Searching NFT...")
            const result = await fetch('https://eth-mainnet.g.alchemy.com/' + alchemyKey + '/v1/getNFTs/?owner=0xcE68e215821ed8e0b31b3227AFb9D019650080c5')
            let NFTs = await result.json();

            NFTs = NFTs.ownedNfts;
            for (let i = 0; NFTs[i]; i++) {
                let result = await fetch('https://eth-mainnet.g.alchemy.com/' + alchemyKey + '/v1/getNFTMetadata?contractAddress=' + NFTs[i].contract.address + '&tokenId=' + NFTs[i].id.tokenId)
                let NFT = await result.json()
                NFT.metadata.image = fixIpfsLink(NFT.metadata.image)
                await sortLink(NFT)
                // console.log(NFT)
            }
            displayImages()

        } catch (e) {
            console.log(e)
        }
    }

    return  (
        <div>
            <button className={"Button"} onClick={displayNFT}>search NFT</button>
            <div>
                {imageDiv}
            </div>
        </div>
    );
}
