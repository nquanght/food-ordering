const express = require('express')
const router = express.Router()

const languageController = require("../controllers/language");
const categoryController = require("../controllers/category");
const foodController = require("../controllers/food");

// Language system
router.get('/get-languages', languageController.getLanguagesSystem)

// Category
router.get('/get-categories', categoryController.getCategories)

// Foods
router.get('/get-foods', foodController.getFoods)

// Restaurants
router.get('/test', foodController.test)

module.exports = router