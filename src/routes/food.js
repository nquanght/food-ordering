const express = require('express')
const router = express.Router()
const foodController = require("../controllers/FoodController")

router.post('/get-foods', foodController.getFoods)
router.post('/get-merchant-food', foodController.getFoodByMerchant)

module.exports = router