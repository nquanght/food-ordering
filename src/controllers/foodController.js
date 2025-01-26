const {responseSuccess} = require("../helpers/response");
const makeBusiness = require('../businesses/init')

const getFoods = async (req, res) => {
    // For get food by date => UPDATING...
    const result = []

    return responseSuccess(res, result)
}

const getFoodByMerchant = async (req, res) => {
    let dataForm = req.body

    let serviceCode = dataForm.service_code
    let merchantId = dataForm.id

    let serviceBusiness = makeBusiness(serviceCode)
    let result = await serviceBusiness.getFoodByMerchantId(merchantId)

    return responseSuccess(res, result)
}
module.exports = {
    getFoods,
    getFoodByMerchant
}