const axios = require('axios')
const merchantConfig = require('../config/merchants')

const getFood = async (requestId) => {
    const merchant = 'shopee_food'

    const merchantConfigElement = merchantConfig[merchant]

    const url = merchantConfigElement.origin + `/dish/get_delivery_dishes?id_type=2&request_id=${requestId}`
    const headers = merchantConfigElement.header

    let result = []

    await axios.get(url,  {headers})
        .then(response => {
            result = response.data
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}

module.exports = {
    getFood
}