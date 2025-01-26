const {isEmpty} = require('lodash')
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

const getMerchantDetailById = async (merchantId) => {
    const url = origin + `/delivery/get_detail?id_type=2&request_id=${merchantId}`

    const response = await callAPIService(url, headers)

    if (response && response.data && response.data.reply) {  
        return response.data.reply.delivery_detail
    }
}

const getMerchantByKeySearch = async (keySearch) => {
    let result = []
    let restaurantIds = []

    /* Search merchant */
    const url = origin + "/delivery/search_global"
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

    /* Find restaurants by key search */
    let data = response.data.reply.search_result || null

    if (data) {
        restaurantIds = getRestaurantIds(payload.foody_services, data)
    }
    
    /* Get info dish by restaurant id */
    if (restaurantIds && restaurantIds.length > 0) {
        let dataInfo = await getInfoDish(restaurantIds)
        result = dataInfo.reply.delivery_infos
    }

    return result;
}

const getInfoDish = async (restaurantId) => {
    /* Get result by result response */
    const urlMerchantInfo = origin + "/delivery/get_infos"

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

const getFoodByMerchantId = async (merchantId) => {
    const url = origin + `/dish/get_delivery_dishes?id_type=2&request_id=${merchantId}`

    const response = await callAPIService(url, headers)

    return response.data
}

module.exports = {
    getMetaData,
    getMerchantDetailById,
    getMerchantByKeySearch,
    getFoodByMerchantId
}