const express = require('express')
const router = express.Router()

const languageController = require("../controllers/LanguageController")

const serviceController = require('../controllers/ServiceController')
const metaDataController = require('../controllers/MetaDataController')

const settingController = require('../controllers/SettingController')

/* Language system */
router.get('/get-languages', languageController.getLanguagesSystem)

/* Service */
router.get('/get-services', serviceController.getServices)

/* Meta Data */
router.post('/get-meta-data', metaDataController.getMetaData)

/* Setting */
router.get('/get-setting', settingController.getAllSettingSystem)

module.exports = router