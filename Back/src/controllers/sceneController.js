async function createScene(req, res) {
    try {
        console.log(req.file)
        res.send(req.file);
    }catch(err) {
        res.send(400);
    }

}
exports.create = [
    // multerHelper,
    createScene
]


