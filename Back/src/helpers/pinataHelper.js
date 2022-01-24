require('dotenv').config();
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

const pinata_api_key = process.env.PINATA_API_KEY
const pinata_secret_api_key = process.env.PINATA_SECRET_API_KEY

async function generateIpfsImage(name) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();

    data.append('file', fs.createReadStream('/Users/mathieutercan/Documents/FuturesFactory-Gen/Back/src/scripts/render_FINAL/'+ name + '.png0001.png'));

    const metadata = JSON.stringify({
        name: name,
    });

    data.append('pinataMetadata', metadata);
    let res =  await axios.post(url, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key,
            pinata_secret_api_key,
        }
    })
    return (res.data.IpfsHash)
}

async function generateIpfsJson(hash, name) {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    let data = {
        "image": "https://gateway.pinata.cloud/ipfs/" + hash,
        "name": name ,
        "NFT": "Futures Factory",
        "description": "A futures factory NFT's",
        "TokenName": "FFSNKR",
    }

    let res =  await axios.post(url, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `application/json`,
            pinata_api_key,
            pinata_secret_api_key,
        }
    })

    return ( {
        imageHash: "https://gateway.pinata.cloud/ipfs/" + hash,
        jsonHash: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
    })
}


async function generateIpfsLink(name) {
    let hash = await generateIpfsImage(name);
   return (await generateIpfsJson(hash, name));
}

module.exports = {
    generateIpfsLink
}
