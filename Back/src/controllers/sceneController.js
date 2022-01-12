const apiResponse = require('../helpers/apiResponse');
const responseMessage = require('../helpers/constants');
const exec = require('child_process').exec;
const queue = require('../helpers/queue')
const fileHandling = require('../helpers/fileHandling')

let queuedFn = queue.queue(createScene);


const object = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

function execShellCommand(nft) {
    return new Promise((resolve, reject) => {
        // exec('rm src/script/render_FINAL/*') // Supprime touts les rendus
        exec('cd src/script/ && ./blender.sh FINAL/' + nft + '.png', async (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return reject(error)
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout:\n${stdout}`);
            exec('rm src/script/FINAL/' + nft +'0001.png')

            return  resolve(stdout? stdout : stderr);
        });
    });
}

async function createScene(req, res) {
    try {
        let name = req.body.name.replace(/#| |/gi, '-')
        if (!req.body.uri) {
            return apiResponse.errorResponse(res, responseMessage.errorMessages.fileNotUpload)
        }
        fileHandling.download(req.body.uri, "/Users/mathieutercan/Documents/FuturesFactory-Gen/Back/src/script/FINAL/" + name + '.png', function (state) {
            console.log("progress", state);
        }, function (response) {
            console.log("status code", response.statusCode);
        }, function (error) {
            return  apiResponse.errorResponse(res, error)
        }, async function () {
                await execShellCommand(name)
                return (apiResponse.successWithFile(res,'/Users/mathieutercan/Documents/FuturesFactory-Gen/Back/src/script/render_FINAL/'+ name + '.png0001.png'))
        });
    } catch(err) {
            return  apiResponse.errorResponse(res, err)
        }
}

function addQueue(req, res) {
    queuedFn(req, res)
}

exports.create = [
    //middleware

    //function
    addQueue,
]


