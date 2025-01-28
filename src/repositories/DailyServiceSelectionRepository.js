const moment = require('moment')
const DailyServiceSelectionModel = require('../models/DailyServiceSelectionModel')
const DailyServiceSelectionDetailModel = require('../models/DailyServiceSelectionDetailModel')

const model = new DailyServiceSelectionModel()
const modelDetail = new DailyServiceSelectionDetailModel()

const insertDataMerchant = async (serviceId, requestId) => {
    let result = []
    let currentDate = moment().format('YYYY-MM-DD')

    let data = await model.getFirstByCondition({
        date: currentDate
    })
    
    if (data) {
        let id = data.id

        let dataInsertDetail = {
            daily_service_selection_id: id,
            service_id: serviceId,
            request_id: requestId
        }

        result = modelDetail.create(dataInsertDetail)
    } else {
        model.create({
            date: currentDate
        }).then(([insertedId]) => {
            let dataNewInsertDetail = {
                daily_service_selection_id: insertedId,
                service_id: serviceId,
                request_id: requestId
            }

            result = modelDetail.create(dataNewInsertDetail)
        })
    }
    
    return result
}

module.exports = {
    insertDataMerchant
}
