const apiResponse = require('../helpers/apiResponse');
const responseMessage = require('../helpers/constants');
const exec = require('child_process').exec;
const queue = require('../helpers/queue')

let queuedFn = queue.queue(createScene);

const object = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

function execShellCommand(nft) {
    return new Promise((resolve, reject) => {
        exec('rm src/script/render_FINAL/*')
        exec('cd src/script/ && ./blender.sh FINAL/' + nft, async (error, stdout, stderr) => {
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
        if (!req.file) {
            return apiResponse.errorResponse(res, responseMessage.errorMessages.fileNotUpload)
        }
        for (const property in object) {
            if (property === req.file.mimetype) {
                await execShellCommand(req.file.filename)
               return (apiResponse.successWithFile(res,'/Users/mathieutercan/Documents/FuturesFactory-Gen/Back/src/script/render_FINAL/'+req.file.filename +'0001.png'))
            }
        }
        return apiResponse.errorResponse(res, responseMessage.errorMessages.invalidExtension)

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


