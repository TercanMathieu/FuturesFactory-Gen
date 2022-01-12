import React, { useState } from 'react';

/// Le wallet utiliser ici n'est pas celui de l'user
export default function DisplayNFT (props) {
    let [imageDiv, setImages] = useState([]);
    const [img, setImg] = useState([])
    let [url, setUrl] = useState([])
    const images = [];

    async function getImageNft(NFTs) {
        try {
            for (let i = 0; NFTs[i]; i++) {
                let result = await fetch('https://eth-mainnet.g.alchemy.com/uOzZFEBi8Egx4iiodz805ZVzeDnVs3PJ/v1/getNFTMetadata?contractAddress=' + NFTs[i].contract.address + '&tokenId=' + NFTs[i].id.tokenId)
                let NFT = await result.json()
                let res = await fetch(NFT.media.uri).catch(err => {
                    console.log('DEBUG - Error: ' + err.message);
                })
                if (NFT.media.uri && res) {
                        res = await res.text()
                        if (!res.startsWith("GIF")) {
                            images.push({uri: NFT.media.uri, name: NFT.metadata.name})
                        }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

     async function searchNft() {
        try {
            const result = await fetch('https://eth-mainnet.g.alchemy.com/uOzZFEBi8Egx4iiodz805ZVzeDnVs3PJ/v1/getNFTs/?owner=0xcE68e215821ed8e0b31b3227AFb9D019650080c5')
            const NFTs = await result.json();
            await getImageNft(NFTs.ownedNfts);

            imageDiv = images.map((img, k) => <button id={k}><img onError={({currentTarget}) => {
                currentTarget.onerror = null; // prevents looping
                document.getElementById(k).remove()
            }} style={{width: 50, height: 50, backgroundColor: 'powderblue'}} k={k} src={img.uri} alt="my image"
                                                                  onClick={() => setImg(img)}/></button>);
            setImages(imageDiv)

        } catch (e) {
            console.log(e)
         }
    }

    async function getNFT() {
        try {
            let formdata = new FormData();
            console.log(img.uri)
            formdata.append("uri", img.uri);
            formdata.append("name", img.name);
            let requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                cache: 'no-cache',
            };

            let res = await fetch("http://localhost:8080/api/create", requestOptions)
            const blob = await res.blob()
            const uploadImage = URL.createObjectURL(blob)
            setUrl(uploadImage);

        } catch (e) {
            console.log(e)
        }
    }

        return (
            <div>
        <button onClick={searchNft}>search NFT</button>
                <div>
                    {imageDiv}
                    <button onClick={getNFT}>Send</button>
                </div>
                <img src={url} />
            </div>
        );
}
