const {responseSuccess} = require("../helpers/response");

const merchantRepository = require("../repositories/merchantRepository");
const merchantService = require("../services/merchantService");

const getMerchantDetail = async (req, res) => {
    // let requestId = req.query.request_id
    let requestId = 11385

    let dataMerchant = await merchantRepository.getMerchantDetailById(requestId)

    let result = merchantService.repairDataMerchantDetail(dataMerchant)

    return responseSuccess(res, result)
}

const searchMerchantByKeySearch = async (req, res) => {
    const keySearch = req.body.key_word
    let result = await merchantRepository.getMerchantByKeySearch(keySearch)
    
    return responseSuccess(res, result)
}

module.exports = {
    searchMerchantByKeySearch,
    getMerchantDetail
}