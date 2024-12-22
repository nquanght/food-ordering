const axios = require('axios')
const merchantConfig = require('../config/merchants')
const {isEmpty} = require('lodash')
const {callAPIService} = require('../helpers/api')
const merchantService = require('../services/merchantService')

const getMerchantByKeySearch = async (keySearch) => {
    let result = []
    let restaurantIds = []
    
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
        sort_type: 8
    }

    const response = await callAPIService(url, headers, 'post', payload)

    // Find restaurants by key search
    let data = response.data.reply.search_result || null

    if (data) {
        restaurantIds = getRestaurantIds(payload.foody_services, data)
    }
    
    // Get info dish by restaurant id
    if (restaurantIds && restaurantIds.length > 0) {
        let dataInfo = await getInfoDish(restaurantIds)
        let listMerchant = dataInfo.reply.delivery_infos
        result = merchantService.repairDataSearchingMerchant(listMerchant)
    }

    return result;
}

const getInfoDish = async (restaurantId) => {
    const merchant = 'shopee_food'

    const merchantConfigElement = merchantConfig[merchant]
    const headers = merchantConfigElement.header

    // Get result by result response
    const urlMerchantInfo = merchantConfigElement.origin + "/delivery/get_infos"

    let payloadMerchantInfo = {
        restaurant_ids: restaurantId
    }

    const response = await callAPIService(urlMerchantInfo, headers, 'post', payloadMerchantInfo)

    return response.data
}

const getRestaurantIds = (foodyServices, data) => {
    let result = []

    if (isEmpty(foodyServices) || isEmpty(data)) {
        return []
    }

    data.forEach(item => {
        if(foodyServices.includes(item.foody_service)) {
            result = result.concat(item.restaurant_ids)
        }
    })

    return result
}

const getMerchantDetailById = async (requestId) => {
    const merchant = 'shopee_food'

    const merchantConfigElement = merchantConfig[merchant]

    const url = merchantConfigElement.origin + `/delivery/get_detail?id_type=2&request_id=${requestId}`
    const headers = merchantConfigElement.header

    const response = await callAPIService(url, headers)

    return response.data.reply.delivery_detail
    

    // while (true) {
    //     try {
    //         const response = await axios.get(url,  {headers})

    //         return response.data.reply.delivery_detail
    //     } catch (error) {
    //         if (error.response && error.response.status === statusCode.unAuthorized) {
    //             console.log(`403 Forbidden: Retrying fetch data merchant`);
    //         } else {
    //             console.error(error.response.message)
    //             throw error
    //         }
    //     }
    // }
}

module.exports = {
    getMerchantByKeySearch,
    getMerchantDetailById
}