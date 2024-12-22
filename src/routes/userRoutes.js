const express = require('express')
const router = express.Router()

const languageController = require("../controllers/languageController")
const categoryController = require("../controllers/categoryController")
const foodController = require("../controllers/foodController")
const merchantController = require("../controllers/merchantController")
const deliveryAppController = require('../controllers/deliveryAppController')

// Language system
router.get('/get-languages', languageController.getLanguagesSystem)

// Foods
router.get('/get-foods', foodController.getFoods)

// Merchant
router.get('/get-merchant-detail', merchantController.getMerchantDetail)

// Delivery App
router.get('/get-delivery-apps', deliveryAppController.getDeliveryApps)

// Search merchant
router.post('/search_merchant', merchantController.searchMerchantByKeySearch)

module.exports = router