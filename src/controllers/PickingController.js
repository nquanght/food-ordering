const {responseSuccess, responseCreated} = require("../helpers/response");
const dailyServiceSelectionRepository = require('../repositories/DailyServiceSelectionRepository')
const serviceRepository = require('../repositories/ServiceRepository')
const pickingService = require('../services/PickingService')

const pickingMerchantToday = async (req, res) => {
    let dataForm = req.body

    let serviceCode = dataForm.service_code
    let merchantId = dataForm.merchant_id

    let result = []

    let service = await serviceRepository.getServiceByCode(serviceCode)
    
    if (service) {
        let serviceId = service.id
        result = await dailyServiceSelectionRepository.insertDataPickingMerchant(serviceId, merchantId)   
    } else {
        throw new Error('Cannot identify service !')
    }

    return responseCreated(res, result)
}

const unpickMerchantToday = async (req, res) => {
    let dataForm = req.body

    let detailId = dataForm.detail_id
    
    let result = await dailyServiceSelectionRepository.removeDataPickingMerchant(detailId)  

    return responseCreated(res, result)
}

const getSelectedMerchantToday = async (req, res) => {
    let date = req.params.date
    
    let dataSelected = await dailyServiceSelectionRepository.getSelectedMerchantToday(date)

    let result = pickingService.repairDataPickingToday(dataSelected)

    return responseSuccess(res, result)
}

module.exports = {
    pickingMerchantToday,
    unpickMerchantToday,
    getSelectedMerchantToday
}