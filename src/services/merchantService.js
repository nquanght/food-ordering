const {isEmpty} = require('lodash')
const moment = require('moment')

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

    let weekDays = data.delivery && data.delivery.time && data.delivery.time.week_days ? data.delivery.time.week_days : []

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
        week_day: getDayOfWeek(weekDays)
    }
}

const getDayOfWeek = (weekDays) => {
    let result = {}

    weekDays.forEach(item => {
        let weekDayIndex = item.week_day
        let startTime = item.start_time
        let endTime = item.end_time

        if (!result.hasOwnProperty(weekDayIndex)) {
            result[weekDayIndex] = [
                {
                    start_time: startTime,
                    end_time: endTime
                }
            ]
        } else {
            result[weekDayIndex].push({
                start_time: startTime,
                end_time: endTime
            })
        }
    })

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

module.exports = {
    repairDataMerchantDetail,
    repairDataSearchingMerchant
}