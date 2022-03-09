require('dotenv').config();
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

const pinata_api_key = process.env.PINATA_API_KEY
const pinata_secret_api_key = process.env.PINATA_SECRET_API_KEY

async function generateIpfsData (path, name) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', fs.createReadStream(path));

    const metadata = JSON.stringify({
        name: name,
    });
    data.append('pinataMetadata', metadata);
    let res =  await axios.post(url, data, {
        maxBodyLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key,
            pinata_secret_api_key,
        }
    })
    return (res.data.IpfsHash)
}

async function generateIpfsJson(imageHash,videoHash, name) {
    try {
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        let data = {
            "image": "https://gateway.pinata.cloud/ipfs/" + imageHash,
            "name": name,
            "video": "https://gateway.pinata.cloud/ipfs/" + videoHash,
            "NFT": "Futures Factory",
            "description": "A futures factory NFT's",
            "TokenName": "FFSNKR",
        }

        let res = await axios.post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `application/json`,
                pinata_api_key,
                pinata_secret_api_key,
            }
        })
        return ({
            imageHash: "https://gateway.pinata.cloud/ipfs/" + imageHash,
            videoHash: "https://gateway.pinata.cloud/ipfs/" + videoHash,
            jsonHash: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
        })
    } catch (e) {
        console.log(e)
    }
}


async function generateIpfsLink(name) {
    let image = await generateIpfsData('/Users/mathieutercan/Documents/FuturesFactory-Gen/Back/src/scripts/picture_FINAL/'+ name + '.png0001.png', name);
    let video = await generateIpfsData('/Users/mathieutercan/Documents/FuturesFactory-Gen/Back/src/scripts/render_FINAL/'+ name + '.png0001-0001.avi', name);
   return (await generateIpfsJson(image, video, name));
}

module.exports = {
    generateIpfsLink
}
