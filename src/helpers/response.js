const makeResponse = (data = [], statusCode = 200, message = '', errors = []) => {
    return {
        status: statusCode,
        message: message,
        data: data,
        errors: errors
    }
}

const responseSuccess = (res, data = [], statusCode = 200, errors = [], message = 'Success') => {
    let response = makeResponse(data, statusCode, message, errors)
    res.status(statusCode).json(response)
}


module.exports = {
    responseSuccess
}