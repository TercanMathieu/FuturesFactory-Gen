const apiResponse = require('../helpers/apiResponse');
const responseMessage = require('../helpers/constants');

async function createScene(req, res) {
    try {
        if (!req.file) {
            return apiResponse.errorResponse(res, responseMessage.errorMessages.fileNotUpload)
        }
        return apiResponse.successResponseWithData(res, {data: req.file, message: responseMessage.successMessages.success }  )
    }catch(err) {
       return  apiResponse.errorResponse(res, err)
    }

}
exports.create = [
    createScene
]


