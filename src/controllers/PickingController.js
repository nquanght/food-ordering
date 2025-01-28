const {responseSuccess, responseCreated} = require("../helpers/response");
const dailyServiceSelectionRepository = require('../repositories/DailyServiceSelectionRepository')
const serviceRepository = require('../repositories/ServiceRepository')

const pickingMerchantToday = async (req, res) => {
    let dataForm = req.body

    let serviceCode = dataForm.service_code
    let merchantId = dataForm.id

    let result = []

    let service = await serviceRepository.getServiceByCode(serviceCode)
    
    if (service) {
        let serviceId = service.id
        result = await dailyServiceSelectionRepository.insertDataMerchant(serviceId, merchantId)   
    } else {
        throw new Error('Cannot identify service !')
    }

    return responseCreated(res, result)
}

module.exports = {
    pickingMerchantToday
}