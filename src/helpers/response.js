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

const responseCreated = (res, data = [], statusCode = 201, errors = [], message = 'Created successfully') => {
    let response = makeResponse(data, statusCode, message, errors)
    res.status(statusCode).json(response)
}


module.exports = {
    responseSuccess,
    responseCreated
}