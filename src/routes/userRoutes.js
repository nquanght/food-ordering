const express = require('express')
const router = express.Router()

const languageController = require("../controllers/languageController");
const categoryController = require("../controllers/categoryController");
const foodController = require("../controllers/foodController");

// Language system
router.get('/get-languages', languageController.getLanguagesSystem)

// Category
router.get('/get-categories', categoryController.getCategories)

// Foods
router.get('/get-foods', foodController.getFoods)

// Restaurants
router.get('/test', foodController.test)

module.exports = router