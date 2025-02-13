const {isEmpty} = require('lodash')

const repairDataPickingToday = (data) => {
    let result = {}

    if(isEmpty(data)) {
        return result
    }

    data.forEach((item) => {
        if (!result.hasOwnProperty(item.service_code)) {
            Object.assign(result, {
                [item.service_code]: {
                    merchants: [],
                    total_picked: 0
                }
            })
        }
        
        result[item.service_code].merchants.push(item)
        result[item.service_code].total_picked += 1
    })

    return result
}

module.exports = {
    repairDataPickingToday
}