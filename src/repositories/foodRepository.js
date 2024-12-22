const merchantConfig = require('../config/merchants')
const {callAPIService} = require('../helpers/api')

const getFood = async (requestId) => {
    const merchant = 'shopee_food'

    const merchantConfigElement = merchantConfig[merchant]

    const url = merchantConfigElement.origin + `/dish/get_delivery_dishes?id_type=2&request_id=${requestId}`
    const headers = merchantConfigElement.header

    const response = await callAPIService(url, headers)

    return response.data
}

module.exports = {
    getFood
}