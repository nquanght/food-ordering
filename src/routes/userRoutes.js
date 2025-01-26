const express = require('express')
const router = express.Router()

const languageController = require("../controllers/LanguageController")
const foodController = require("../controllers/FoodController")
const merchantController = require("../controllers/MerchantController")
const serviceController = require('../controllers/ServiceController')
const metaDataController = require('../controllers/MetaDataController')
const pickingController = require('../controllers/PickingController')

/* Language system */
router.get('/get-languages', languageController.getLanguagesSystem)

/* Foods */
router.post('/get-foods', foodController.getFoods)
router.post('/get-merchant-food', foodController.getFoodByMerchant)

/* Merchant */
router.post('/get-merchant-detail', merchantController.getMerchantDetail)

/* Service */
router.get('/get-services', serviceController.getServices)

/* Search merchant */
router.post('/search-merchant', merchantController.searchMerchantByKeySearch)

/* Meta Data */
router.post('/get-meta-data', metaDataController.getMetaData)

/* Picking */
router.post('/pick-merchant', pickingController.pickingMerchantToday)

module.exports = router