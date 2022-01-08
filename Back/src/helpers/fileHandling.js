const fs = require("fs-extra")
const progress = require("request-progress");
const request = require("request");

async function writeFile(path, content) {
    await fs.outputFile(path, content)
}

async function readFile(path) {
    return await fs.readFile(path, "utf8")
}

async function writeJsonFile(path, obj) {
    await fs.outputFile(path, JSON.stringify(obj, null, 4))
}

async function readJsonFile(path) {
    return await fs.readJson(path)
}

function download (uri, path, onProgress, onResponse, onError, onEnd) {
    progress(request(uri))
        .on('progress', onProgress)
        .on('response', onResponse)
        .on('error', onError)
        .on('end', onEnd)
        .pipe(fs.createWriteStream(path))
}

module.exports = {
    download,
    writeFile,
    readFile,
    writeJsonFile,
    readJsonFile
}
