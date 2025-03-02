const express = require('express')
const router = express.Router()
const merchantController = require("../controllers/MerchantController")

router.post('/get-merchant-detail', merchantController.getMerchantDetail)
router.post('/get-list-merchant-detail', merchantController.getListMerchantDetail)
router.post('/get-merchant-branches', merchantController.getMerchantBranches)

router.post('/search-merchant', merchantController.searchMerchantByKeySearch)

module.exports = router

