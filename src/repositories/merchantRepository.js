const axios = require('axios')
const merchantConfig = require('../config/merchants')

const getMerchantByKeySearch = async (keySearch) => {
    let result = []
    
    const merchant = 'shopee_food'

    const merchantConfigElement = merchantConfig[merchant]

    // Search merchant
    const url = merchantConfigElement.origin + "/delivery/search_global"
    const headers = merchantConfigElement.header
    const payload = {
        category_group: 1,
        city_id: 217, // HCM city id
        delivery_only: true,
        keyword: keySearch,
        full_restaurant_ids: true,
        foody_services: [1],
        combine_categories: [
            {
                "code": 1,
                "id": 1000000
            }
        ],
        sort_type: 8
    }

    // Get result by result response
    const urlMerchantInfo = merchantConfigElement.origin + "/delivery/get_infos"
    
    await axios.post(url, payload, {headers})
        .then(async response => {
            let data = response.data
            let restaurantIds = data.reply.search_result[0]['restaurant_ids']

            let payloadMerchantInfo = {
                restaurant_ids: restaurantIds
            }

            await axios.post(urlMerchantInfo, payloadMerchantInfo, {headers})
                .then(responseInfo => {
                    let dataInfo = responseInfo.data
                    let listMerchant = dataInfo.reply.delivery_infos

                    if (listMerchant && listMerchant.length > 0) {
                        listMerchant.forEach(item => {
                            result.push({
                                name: item.name,
                                address: item.address
                            })
                        });
                    }
                })
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}

const getMerchantDetailById = async (requestId) => {
    let result = []

    const merchant = 'shopee_food'

    const merchantConfigElement = merchantConfig[merchant]

    const url = merchantConfigElement.origin + `/delivery/get_detail?id_type=2&request_id=${requestId}`
    const headers = merchantConfigElement.header

    await axios.get(url,  {headers})
        .then(response => {
            result = response.data.reply.delivery_detail
        })
        .catch(error => {
            console.error(error);
        });

    return result
}

module.exports = {
    getMerchantByKeySearch,
    getMerchantDetailById
}