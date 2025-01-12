const express = require('express')
const router = express.Router()

const languageController = require("../controllers/languageController")
const foodController = require("../controllers/foodController")
const merchantController = require("../controllers/merchantController")
const serviceController = require('../controllers/serviceController')
const metaDataController = require('../controllers/metaDataController')

/* Language system */
router.get('/get-languages', languageController.getLanguagesSystem)

/* Foods */
router.post('/get-foods', foodController.getFoods)

/* Merchant */
router.post('/get-merchant-detail', merchantController.getMerchantDetail)

/* Service */
router.get('/get-services', serviceController.getServices)

/* Search merchant */
router.post('/search-merchant', merchantController.searchMerchantByKeySearch)

/* Meta Data */
router.post('/get-meta-data', metaDataController.getMetaData)

module.exports = router