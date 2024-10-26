const {responseSuccess} = require("../helpers/response");
const fs = require('fs')
const path = require('path');
const languageService = require(path.join(SERVICE_PATH, 'languageService.js'))

const getLanguagesSystem = (req, res) => {
    // add try catch here => throw exception when fail to load language files
    let result = languageService.getLanguageSystemByRegional()
    return responseSuccess(res, result)
}

module.exports = {
    getLanguagesSystem
}