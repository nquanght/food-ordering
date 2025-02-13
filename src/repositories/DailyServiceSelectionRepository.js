const moment = require('moment')
const DailyServiceSelectionModel = require('../models/DailyServiceSelectionModel')
const DailyServiceSelectionDetailModel = require('../models/DailyServiceSelectionDetailModel')

const insertDataPickingMerchant = async (serviceId, requestId) => {
    let currentDate = moment().format('YYYY-MM-DD')

    let data = await DailyServiceSelectionModel.getFirstByCondition({
        date: currentDate
    })
    
    if (data) {
        let id = data.id

        let dataInsertDetail = {
            daily_service_selection_id: id,
            service_id: serviceId,
            request_id: requestId
        }

        DailyServiceSelectionDetailModel.create(dataInsertDetail)
    } else {
        DailyServiceSelectionModel.create({
            date: currentDate
        }).then(([insertedId]) => {
            let dataNewInsertDetail = {
                daily_service_selection_id: insertedId,
                service_id: serviceId,
                request_id: requestId
            }

            DailyServiceSelectionDetailModel.create(dataNewInsertDetail)
        })
    }
    
    return await DailyServiceSelectionModel.getDB()
        .join(
            'daily_service_selection_detail', 'daily_service_selection.id', '=', 'daily_service_selection_detail.daily_service_selection_id'
        )
        .where({date: currentDate})
        .whereNull('daily_service_selection.deleted_at')
        .whereNull('daily_service_selection_detail.deleted_at')
        .select(
            'daily_service_selection.date', 'daily_service_selection_detail.*'
        )
}

const removeDataPickingMerchant = async (detailId) => {
    let currentDate = moment().format('YYYY-MM-DD')

    await DailyServiceSelectionDetailModel.softDelete(detailId)

    return await DailyServiceSelectionModel.getDB()
        .join(
            'daily_service_selection_detail', 'daily_service_selection.id', '=', 'daily_service_selection_detail.daily_service_selection_id'
        )
        .where({date: currentDate})
        .whereNull('daily_service_selection.deleted_at')
        .whereNull('daily_service_selection_detail.deleted_at')
        .select(
            'daily_service_selection.date', 'daily_service_selection_detail.*'
        )
}

const getSelectedMerchantToday = async (date) => {
    let result = await DailyServiceSelectionDetailModel.getDB()
        .join(
            'daily_service_selection',
            'daily_service_selection.id', '=','daily_service_selection_detail.daily_service_selection_id'
        )
        .join(
            'service',
            'daily_service_selection_detail.service_id', '=', 'service.id'
        )
        .where({
            'daily_service_selection.date': date,
            'service.status': ACTIVE_STATUS,
            'service.type': 'external'
        })
        .whereNull('daily_service_selection.deleted_at')
        .whereNull('daily_service_selection_detail.deleted_at')
        .whereNull('service.deleted_at')
        .select(
            'daily_service_selection.id as daily_serice_selection_id',
            'daily_service_selection_detail.id as detail_id',
            'daily_service_selection.date',
            'daily_service_selection_detail.request_id',
            'daily_service_selection_detail.service_id',
            'service.name as service_name',
            'service.code as service_code',
            'service.logo as service_logo',
        )
        .orderBy('daily_service_selection_detail.id', 'asc')

    return result
}

module.exports = {
    insertDataPickingMerchant,
    removeDataPickingMerchant,
    getSelectedMerchantToday
}
