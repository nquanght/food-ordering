const moment = require('moment')
const { isEmpty } = require('lodash')
const model = require('../models/DailyServiceSelectionModel')
const dailyServiceSelectionDetailRepository = require('../repositories/DailyServiceSelectionDetailRepository')

const insertDataMerchant = async (serviceId, requestId) => {
    let result = []
    let currentDate = moment().format('YYYY-MM-DD')

    let query = await model.where('date', currentDate).whereNull('deleted_at')

    if (isEmpty(query)) {
        let dataToday = await model.insert({
            date: currentDate
        })

        let id = dataToday[0]

        let dataInsertDetail = {
            daily_service_selection_id: id,
            service_id: serviceId,
            request_id: requestId
        }

        result = await dailyServiceSelectionDetailRepository.insertDataDetail(dataInsertDetail)
    } else {
        let id = query[0].id

        let dataInsertDetail = {
            daily_service_selection_id: id,
            service_id: serviceId,
            request_id: requestId
        }

        result = await dailyServiceSelectionDetailRepository.insertDataDetail(dataInsertDetail)
    }

    return result
}

module.exports = {
    insertDataMerchant
}
