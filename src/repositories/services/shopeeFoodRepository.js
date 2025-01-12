const merchantConfig = require('../../config/merchants')
const {callAPIService} = require('../../helpers/api')

const merchantName = 'shopee_food'
const merchantConfigElement = merchantConfig[merchantName]
const headers = merchantConfigElement.header
const origin = merchantConfigElement.origin

const getMetaData = async () => {
    let url = origin + '/meta/get_metadata'
    const response = await callAPIService(url, headers)
    
    return response.data
}

module.exports = {
    getMetaData
}