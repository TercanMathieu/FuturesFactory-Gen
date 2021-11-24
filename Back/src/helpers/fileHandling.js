const fs = require("fs-extra")

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

module.exports = {
    writeFile,
    readFile,
    writeJsonFile,
    readJsonFile
}
