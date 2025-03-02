const express = require('express')
const router = express.Router()
const pickingController = require('../controllers/PickingController')

router.get('/get-selected-merchant-today/:date', pickingController.getSelectedMerchantToday)
router.post('/pick-merchant', pickingController.pickingMerchantToday)
router.post('/unpick-merchant', pickingController.unpickMerchantToday)

module.exports = router
