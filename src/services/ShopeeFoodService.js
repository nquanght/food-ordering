const moment = require('moment')
const { isEmpty } = require('lodash')

const repairDataMerchantDetail = (data) => {
    if (!data) {
        return 
    }
    
    let imageUrl = data.photos && data.photos.length > 0 ? data.photos[data.photos.length - 1].value : ''
    let isMerchantOpening = data.delivery && (data.delivery.operating.status == 1) ? 1 : 0
    let colorOperating = data.delivery && data.delivery.operating ? data.delivery.operating.color : ''

    let minPrice = data.price_range && data.price_range.min_price ? data.price_range.min_price : 0
    let maxPrice = data.price_range && data.price_range.max_price ? data.price_range.max_price : 0

    let totalReview = data.rating && data.rating.total_review ? data.rating.total_review : 0
    let avgRating = data.rating && data.rating.avg ? data.rating.avg : 0

    let latitude = data.position && data.position.latitude ? data.position.latitude : 0
    let longitude = data.position && data.position.longitude ? data.position.longitude : 0

    let operatingTime = data.delivery && data.delivery.time && data.delivery.time ? data.delivery.time : []

    let nextAvailableTime = data.delivery && !isMerchantOpening ? moment(data.delivery.operating.next_available_time, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm') : ''

    return {
        merchant_id: data.id,
        merchant_name: data.name,
        image: imageUrl,
        address: data.address,
        url: data.url,
        operating: {
            is_open: isMerchantOpening,
            color: colorOperating,
            next_available_time: nextAvailableTime
        },
        price_range: {
            min_price: minPrice,
            max_price: maxPrice
        },
        rating: {
            total_review: totalReview,
            avg: avgRating
        },
        position: {
            latitude: latitude,
            longitude: longitude
        },
        brand: data.brand,
        brand_id: data.brand_id,
        week_day: getDayOfWeek(operatingTime)
    }
}

const getDayOfWeek = (operatingTime) => {
    let result = {}

    let weekDays = operatingTime.week_days
    let availableTime = operatingTime.available
    let currentDate = moment().format('YYYY-MM-DD')

    let listTime = []

    if (!isEmpty(availableTime)) {
        listTime = availableTime.filter((item, idx) => item.date == currentDate)

        if (isEmpty(listTime)) {
            listTime = weekDays
        }
    } else if (!isEmpty(weekDays)) {
        listTime = weekDays
    }

    if (!isEmpty(listTime)) {
        listTime.forEach(item => {
            let weekDayIndex = item.week_day
            let startTime = item.start_time
            let endTime = item.end_time
            let date = item.date || ''
    
            if (!result.hasOwnProperty(weekDayIndex)) {
                result[weekDayIndex] = [
                    {
                        date: date,
                        start_time: startTime,
                        end_time: endTime
                    }
                ]
            } else {
                result[weekDayIndex].push({
                    date: date,
                    start_time: startTime,
                    end_time: endTime
                })
            }
        })
    } 

    return result
}

const repairDataSearchingMerchant = (listData) => {
    let result = []

    if (!listData) {
        return result
    }

    listData.forEach(item => {
        let imageUrl = item.photos[item.photos.length - 1].value
        result.push({
            id: item.delivery_id,
            name: item.name,
            address: item.address,
            is_open: item.is_open,
            image: imageUrl
        })
    });

    return result
}

const repairDataFood = (listData) => {
    let result = []

    if (isEmpty(listData)) {
        return result
    }
    
    let data = listData['reply']['menu_infos']

    data.forEach((item) => {
        let dishInfo = {
            category_id: item.dish_type_id,
            category_name: item.dish_type_name,
            remain: item.dishes.length,
            foods: []
        }

        if (item.dishes.length > 0) {
            item.dishes.forEach((dish) => {
                dishInfo.foods.push({
                    food_id: dish.id,
                    food_name: dish.name,
                    description: dish.description,
                    price: dish.price.value,
                    discount_price: dish.hasOwnProperty('discount_price') ? dish.discount_price.value : null,
                    thumbnail_url: dish.photos[2].value,
                    is_out_of_stock: !dish.is_available
                })
            })
        }
        result.push(dishInfo)
    })

    return result
}

module.exports = {
    repairDataMerchantDetail,
    repairDataSearchingMerchant,
    repairDataFood
}

