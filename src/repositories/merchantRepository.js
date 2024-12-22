const axios = require('axios')
const merchantConfig = require('../config/merchants')
const {isEmpty} = require('lodash')
const {callAPIService} = require('../helpers/api')

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

    // Find restaurants by key search
    await axios.post(url, payload, {headers})
        .then(async response => {
            let data = response.data.reply.search_result || null   
            
            if (data) {
                restaurantIds = getRestaurantIds(payload.foody_services, data)
            }
        })
        .catch(error => {
            console.error(error.message);
        });

    // Get info dish by restaurant id
    if (restaurantIds && restaurantIds.length > 0) {
        await getInfoDish(restaurantIds)
            .then(responseInfo => {
                let dataInfo = responseInfo.data
                let listMerchant = dataInfo.reply.delivery_infos

                if (listMerchant && listMerchant.length > 0) {
                    listMerchant.forEach(item => {
                        let imageUrl = item.photos[item.photos.length - 1].value
                        result.push({
                            id: item.delivery_id,
                            name: item.name,
                            address: item.address,
                            is_open: item.is_open,
                            image: imageUrl
                        })
                    });
                }
            })
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

    return await axios.post(urlMerchantInfo, payloadMerchantInfo, {headers})
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