const express = require('express')
const router = express.Router()

const languageController = require("../controllers/languageController");
const categoryController = require("../controllers/categoryController");
const foodController = require("../controllers/foodController");
const merchantController = require("../controllers/merchantController");

// Language system
router.get('/get-languages', languageController.getLanguagesSystem)

// Category
// router.get('/get-categories', categoryController.getCategories)

// Foods
router.get('/get-foods', foodController.getFoods)

// Search merchant
router.post('/search_merchant', merchantController.searchMerchantByKeyWord)

module.exports = router