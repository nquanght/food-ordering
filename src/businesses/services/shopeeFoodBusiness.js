/* REPOSITORY */
const shopeeFoodRepository = require('../../repositories/services/ShopeeFoodRepository')
const shopeeFoodService = require('../../services/ShopeeFoodService')

const getMetaData = async () => {
    return await shopeeFoodRepository.getMetaData()
}

const getMerchantDetailById = async (merchantId) => {
    let dataMerchant = await shopeeFoodRepository.getMerchantDetailById(merchantId)
    return shopeeFoodService.repairDataMerchantDetail(dataMerchant)
}

const searchMerchant = async (keySearch) => {
    let resultMerchantSearching = await shopeeFoodRepository.getMerchantByKeySearch(keySearch)
    return shopeeFoodService.repairDataSearchingMerchant(resultMerchantSearching)
}

const getFoodByMerchantId = async (merchantId) => {
    let resultFood = await shopeeFoodRepository.getFoodByMerchantId(merchantId)
    return shopeeFoodService.repairDataFood(resultFood)
}

module.exports = {
    getMetaData,
    getMerchantDetailById,
    searchMerchant,
    getFoodByMerchantId
}