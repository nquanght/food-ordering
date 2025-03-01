const { isArray } = require('lodash')

/* REPOSITORY */
const shopeeFoodRepository = require('../../repositories/services/ShopeeFoodRepository')
const shopeeFoodService = require('../../services/ShopeeFoodService')

const getMetaData = async () => {
    let metaData = await shopeeFoodRepository.getMetaData()
    return shopeeFoodService.repairMetaData(metaData)
}

const getMerchantDetailById = async (merchantId) => {
    let dataMerchant = await shopeeFoodRepository.getMerchantDetailById(merchantId)
    return shopeeFoodService.repairDataMerchantDetail(dataMerchant)
}

const getListMerchantDetailById = async (dataMerchantSelected) => {
    let result = []

    if (!isArray(dataMerchantSelected) || dataMerchantSelected.length === 0) {
        return result;
    }

    const promises = dataMerchantSelected.map(async (data) => {
        let requestId = data.request_id || 0
        let detailId = data.detail_id || 0

        let dataMerchant = await shopeeFoodRepository.getMerchantDetailById(requestId)
        let result = shopeeFoodService.repairDataMerchantDetail(dataMerchant)
        
        result.detail_id = detailId

        return result
    });

    return Promise.all(promises);
}

const searchMerchant = async (dataForm) => { 
    let resultMerchantSearching = await shopeeFoodRepository.getMerchantByKeySearch(dataForm)

    return shopeeFoodService.repairDataSearchingMerchant(resultMerchantSearching)
}

const getFoodByMerchantId = async (merchantId) => {
    let resultFood = await shopeeFoodRepository.getFoodByMerchantId(merchantId)
    return shopeeFoodService.repairDataFood(resultFood)
}

const getMerchantBranches = async (brandId) => {
    let result = []

    let branches = await shopeeFoodRepository.getBranchesByBrandId(brandId)
    
    let branchesRepair = shopeeFoodService.repairDataMerchantBranches(branches)

    branchesRepair.branches_data = []

    if (!branchesRepair.has_branch) {
        result = branchesRepair

    } else {
        const response = await Promise.all(
            branchesRepair.branches_id.map(async (branchId) => {
                let dataMerchant = await shopeeFoodRepository.getMerchantDetailById(branchId)
                let dataRepair = shopeeFoodService.repairDataMerchantDetail(dataMerchant)

                return dataRepair
            })
        )
        branchesRepair.branches_data = response
        
        result = branchesRepair
    }

    return result
}

module.exports = {
    getMetaData,
    getMerchantDetailById,
    getListMerchantDetailById,
    searchMerchant,
    getFoodByMerchantId,
    getMerchantBranches
}