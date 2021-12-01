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

function execShellCommand() {
    return new Promise((resolve, reject) => {
        exec('cd src/script/ && ./blender.sh', async (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return reject(error)
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout:\n${stdout}`);
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
                await execShellCommand()
                return(apiResponse.successWithFile(res,'/home/tercan/Documents/Stage/FuturesFactory-Gen/Back/src/script/render_FINAL/'+req.file.filename +'0001.png'))
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
    // createScene
]


