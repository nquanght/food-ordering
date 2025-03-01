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

const getMerchantByKeySearch = async (dataForm) => {
    let result = []
    let restaurantIds = []

    /* Search merchant */
    const url = origin + "/delivery/search_global"

    let payload = {
        category_group: 1,
        delivery_only: true,
        full_restaurant_ids: true,
        sort_type: 8,
        keyword: dataForm['key_word'],
        foody_services: [dataForm['service_ids']],
        city_id: dataForm['city_ids'],
        district_ids: dataForm['district_ids'],
        combine_categories: []
    }

    if (dataForm.hasOwnProperty('category_ids') && !isEmpty(dataForm['category_ids'])) {
        dataForm['category_ids'].forEach(item => {
            payload.combine_categories.push({
                code: 1,
                id: item
            })
        })
    }

    const response = await callAPIService(url, headers, 'post', payload)
 
    /* Find restaurants by key search */
    let data = response.data && response.data.reply && response.data.reply.search_result ? response.data.reply.search_result : null

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

const getBranchesByBrandId = async (brandId) => {
    const url = origin + `/delivery/get_ids_of_brand?brand_id=${brandId}`

    const branches = await callAPIService(url, headers)

    return branches.data && branches.data.reply ? branches.data.reply : []
}

module.exports = {
    getMetaData,
    getMerchantDetailById,
    getMerchantByKeySearch,
    getFoodByMerchantId,
    getBranchesByBrandId
}