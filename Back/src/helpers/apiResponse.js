exports.successResponse = function (res, msg) {
    const data = {
        message: msg
    };
    return res.status(200).json(data);
};

exports.successWithFile = function (res, path) {
    return res.sendFile(path)
}

exports.successResponseWithData = function (res, data) {
    return res.status(200).json(data);
};

exports.errorResponse = function (res, msg) {
    const data = {
        message: msg,
    };
    return res.status(500).json(data);
}

exports.notFoundResponse = function (res, msg) {
    const data = {
        message: msg,
    };
    return res.status(404).json(data);
};

exports.validationError = function (res, msg) {
    const data = {
        message: msg,
    };
    return res.status(400).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
    const resData = {
        message: msg,
        data: data
    };
    return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
    const data = {
        message: msg,
    };
    return res.status(401).json(data);
};
