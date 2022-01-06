const apiResponse = require('../helpers/apiResponse');
const responseMessage = require('../helpers/constants');
const exec = require('child_process').exec;
const queue = require('../helpers/queue')
const fs = require('fs'),
    request = require('request');

let queuedFn = queue.queue(createScene);

const object = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

///////// Dl des images via des URI
let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// download('https://www.google.com/images/srpr/logo3w.png', 'google', function(){
//   console.log('done');
// });
////////////

// function fixName(req) {
//     const newName = req.file.filename.replace(/ /g, "_");
//     const target = req.file.filename.split(' ').join(String.fromCharCode(92, 32))

//         console.log('cd src/script/FINAL && mv ' + target + ' ' + newName)
//         exec('cd src/script/FINAL && mv' + req.file.filename + ' ' + newName)
//         exec('ls')
//         req.file.filename = req.file.filename.replace(/ /g, "_");
//         console.log('test')
//             // return  resolve(stdout? stdout : stderr);
//     // });
// }

function execShellCommand(nft) {
    return new Promise((resolve, reject) => {
        exec('rm src/script/render_FINAL/*')

        console.log(nft)
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
                console.log(req.file.filename)
                // fixName(req);
                console.log("yes sir ", req.file.filename)
                await execShellCommand(req.file.filename)
                return (apiResponse.successWithFile(res,'/home/mathieutercan/FF/FuturesFactory-Gen/Back/src/script/render_FINAL/'+ req.file.filename+ '0001.png'))
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


