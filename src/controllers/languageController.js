const {responseSuccess} = require("../helpers/response");

const languageService = require('../services/languageService')

const getLanguagesSystem = (req, res) => {
    /* Add try catch here => throw exception when fail to load language files */
    let result = languageService.getLanguageSystemByRegional()
    return responseSuccess(res, result)
}

module.exports = {
    getLanguagesSystem
}