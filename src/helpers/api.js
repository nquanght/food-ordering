const axios = require('axios')
const helper = require('./common')
const timeOut = 300000
const maxRetries = 10

const callAPIService = async (url = '', headers = {}, method = 'get', data = {}) => {
    let attempt = 0
    // let timeOut = 1000
    let delayTimeOut = 500
    
    // while (true) {
    //     try {
    //         let options = {
    //             method: method,
    //             timeout: timeOut,
    //             headers: headers,
    //             data: data
    //         }

    //         const response = await axios(url, options)

    //         return response
    //     } catch (error) {
    //         if (error.response && error.response.status === statusCode.unAuthorized) {
    //             console.error(`Status code: ${statusCode.unAuthorized} - Retrying fetch data`);
    //         } else {
    //             console.error(error.response.message)
    //             throw error
    //         }
    //     }

    //     attempt += 1

    //     if (attempt > maxRetries) {
    //         throw new Error("Max retries reached. Request failed.");
    //     }

    //     await helper.sleep(timeOut) // delay 1s

    //     timeOut += delayTimeOut
    // }

    try {
        let options = {
            method: method,
            timeout: timeOut,
            headers: headers,
            data: data
        }

        const response = await axios(url, options)

        return response
    } catch (error) {
        if (error.response && error.response.status === statusCode.unAuthorized) {
            console.error(`Status code: ${statusCode.unAuthorized} - Retrying fetch data`);
        } else {
            console.error(error)
            throw error
        }
    }
}

module.exports = {
    callAPIService
}