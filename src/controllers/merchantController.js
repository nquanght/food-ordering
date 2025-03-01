const {responseSuccess} = require("../helpers/response");
const makeBusiness = require('../businesses/init')

const getMerchantDetail = async (req, res) => {
    let dataForm = req.body

    let serviceCode = dataForm.service_code
    let merchantId = dataForm.merchant_id

    let serviceBusiness = makeBusiness(serviceCode)
    let result = await serviceBusiness.getMerchantDetailById(merchantId)

    return responseSuccess(res, result)
}

const getListMerchantDetail = async (req, res) => {
    let dataForm = req.body

    let serviceCode = dataForm.service_code
    let dataMerchantSelected = dataForm.data_merchant_selected

    let serviceBusiness = makeBusiness(serviceCode)
    let result = await serviceBusiness.getListMerchantDetailById(dataMerchantSelected)

    return responseSuccess(res, result)
}

const searchMerchantByKeySearch = async (req, res) => {
    let dataForm = req.body

    let serviceCode = dataForm.service_code

    let serviceBusiness = makeBusiness(serviceCode)
    let result = await serviceBusiness.searchMerchant(dataForm)
    
    return responseSuccess(res, result)
}

const getMerchantBranches = async (req, res) => {
    let dataForm = req.body
    
    let serviceCode = dataForm.service_code
    let brandId = dataForm.brand_id

    let serviceBusiness = makeBusiness(serviceCode)
    let result = await serviceBusiness.getMerchantBranches(brandId)

    return responseSuccess(res, result)
}

module.exports = {
    searchMerchantByKeySearch,
    getMerchantDetail,
    getListMerchantDetail,
    getMerchantBranches
}