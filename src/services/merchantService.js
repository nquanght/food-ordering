const {isEmpty} = require('lodash')
const moment = require('moment')

const repairDataMerchantDetail = (data) => {
    let imageUrl = data.photos[data.photos.length - 1].value
    let isMerchantOpening = data.delivery && (data.delivery.operating.status == 1) ? 1 : 0

    let nextAvailableTime = data.delivery && !isMerchantOpening ? moment(data.delivery.operating.next_available_time, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm') : ''

    return {
        merchant_id: data.id,
        merchant_name: data.name,
        image: imageUrl,
        address: data.address,
        url: data.url,
        operating: {
            is_open: isMerchantOpening,
            color: data.delivery.operating.color ? data.delivery.operating.color : '',
            next_available_time: nextAvailableTime
        },
        price_range: {
            min_price: data.price_range.min_price ? data.price_range.min_price : 0,
            max_price: data.price_range.max_price ? data.price_range.max_price : 0
        },
        rating: {
            total_review: data.rating.total_review ? data.rating.total_review : 0,
            avg: data.rating.avg ? data.rating.avg : 0
        },
        position: {
            latitude: data.position.latitude ? data.position.latitude : 0,
            longitude: data.position.longitude ? data.position.longitude : 0
        },
        brand: data.brand,
        brand_id: data.brand_id,
        week_day: getDayOfWeek(data.delivery.time.week_days ? data.delivery.time.week_days : [])
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

module.exports = {
    repairDataMerchantDetail
}