const {responseSuccess} = require("../helpers/response");
const makeBusiness = require('../businesses/init')

const getMerchantDetail = async (req, res) => {
    let dataForm = req.body

    let serviceCode = dataForm.service_code
    let merchantId = dataForm.id

    let serviceBusiness = makeBusiness(serviceCode)
    let result = await serviceBusiness.getMerchantDetailById(merchantId)

    return responseSuccess(res, result)
}

const searchMerchantByKeySearch = async (req, res) => {
    let dataForm = req.body

    let serviceCode = dataForm.service_code
    let keySearch = dataForm.key_word

    let serviceBusiness = makeBusiness(serviceCode)
    let result = await serviceBusiness.searchMerchant(keySearch)
    
    return responseSuccess(res, result)
}

module.exports = {
    searchMerchantByKeySearch,
    getMerchantDetail
}