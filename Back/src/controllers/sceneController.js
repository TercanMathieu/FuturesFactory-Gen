const apiResponse = require('../helpers/apiResponse');
const responseMessage = require('../helpers/constants');
const exec = require('child_process').exec;
const queue = require('../helpers/queue')
const fileHandling = require('../helpers/fileHandling')
const generateIpfsHash = require('../helpers/pinataHelper')
const {mintNFT} = require('../scripts/Mint')
let queuedFn = queue.queue(createScene);


function execShellCommand(nft) {
    return new Promise((resolve, reject) => {
        // exec('rm src/scripts/render_FINAL/*') // Supprime touts les rendus
        exec('cd src/scripts/ && ./blender.sh FINAL/' + nft + '.png', async (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return reject(error)
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout:\n${stdout}`);
            exec('rm src/scripts/FINAL/' + nft +'0001.png')
            return resolve(stdout? stdout : stderr);
        });
    });
}

async function createScene(req, res) {
    try {
        let name = req.body.name.replace(/#| |/gi, '-')

        if (!req.body.uri || req.body.uri === 'undefined') {
            return apiResponse.errorResponse(res, responseMessage.errorMessages.fileNotUpload)
        }
        fileHandling.download(req.body.uri, "/Users/mathieutercan/Documents/FuturesFactory-Gen/Back/src/scripts/FINAL/" + name + '.png',
            function (state) {
            console.log("progress", state);
        }, function (response) {
            console.log("status code", response.statusCode);
        }, function (error) {
            console.log("error", error);
        },
            async function () {
            try {

                // await execShellCommand(name);
                let ipfs = await generateIpfsHash.generateIpfsLink(name);
                await mintNFT(ipfs, "0x21e0da8fd54e2695d0a542699cc92b22ed486c20");
                return apiResponse.successResponseWithData(res, ipfs);

            } catch (e) {
                console.log(e)
            }
        })

    } catch (err) {
        return apiResponse.errorResponse(res, err)
    }
}

function addQueue(req, res) {
    try {
        queuedFn(req, res)
    } catch (e) {
        console.log(e)
    }
}

exports.create = [
    addQueue,
]


