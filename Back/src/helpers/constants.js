exports.successMessages = {
    created: "Created.",
    updated: "Updated.",
    deleted: "Deleted.",
    success: "Success",
}

exports.validationMessages = {
    emailMissing: "Email must be specified.",
    emailInvalid: "Email must be a valid email address.",
    passwordMissing: "Password must be specified.",
    passwordInvalid: "Password must be 6 characters or greater.",
    tokenMissing: "Token must be specified.",
}

exports.errorMessages = {
    fileNotUpload: "The image are not uploaded",
    invalidToken: "Invalid token.",
    unknownUser: "Unknown user.",
    bannedUser: "Banned account. Please contact admin.",
    emailDuplication: "E-mail already in use.",
    validationError: "Validation error.",
    wrongCredentials: "Email or password wrong.",
    targetNotFound: "Target not found.",
    targetsLimit: "Targets limit.",
    invalidExtension: "Wrong Extension.",
}

exports.errors = {
    wrongJwt: {
        code: 0,
        message: '',
    },
    unknownUser: {
        code: 1,
        message: 'Unknown user.',
    },
    bannedUser: {
        code: 2,
        message: 'Banned account. Please contact admin.',
    },
    emailDuplication: {
        code: 3,
        message: 'E-mail already in use.',
    },
    validationError: {
        code: 4,
        message: 'Validation error.',
    },
    wrongCredentials: {
        code: 5,
        message: 'Email or password wrong.',
    },
    urlUndefined: {
        code: 10,
        message: 'Url is undefined',
    },
    nameUndefined: {
        code: 11,
        message: 'Name is undefined',
    },
    usernameMissing: {
        code: 12,
        message: 'Username is missing',
    },
    wrongBody: {
        code: 14,
        message: 'Wrong body',
    },
    userNoExist: {
        code: 17,
        message: "This user doesn't exist",
    },
    interneError: {
        code: 18,
        message: 'Interne Error',
    },
    formMissing: {
        code: 19,
        message: 'Argument missing in form.',
    },
    queryMissing: {
        code: 20,
        message: 'Query missing.',
    },
    userNoData: {
        code: 21,
        message: 'User have no data',
    },
    Feedbackstars: {
        code: 22,
        message: 'The number of stars must be between 0 and 5',
    },
};

