const {responseSuccess} = require("../helpers/response");
const fs = require('fs')
const path = require('path');

const getLanguagesSystem = (req, res) => {
    // add try catch here => throw exception when fail to load language files
    let languageFiles = fs.readdirSync(LANGUAGE_PATH)

    let regionals = ['vi', 'en']
        let result = {
            ['vi']: {},
            ['en']: {}
        }

    if (languageFiles && languageFiles.length > 0) {

        languageFiles.forEach((file) => {
            let filePath = path.join(LANGUAGE_PATH, file)  
            let dataFile = require(filePath)

            if (dataFile.group_key_lang == 'merchant') {
                if (dataFile.hasOwnProperty('group_lang') && dataFile.group_lang.length > 0) {
                    dataFile.group_lang.forEach((langKey) => {
                
                        regionals.forEach((regional) => {
                            if (!result[regional].hasOwnProperty(dataFile.group_key_lang)) {
                                Object.assign(result[regional], 
                                    {
                                        [dataFile.group_key_lang]: {}
                                    }
                                )
                            }

                            let arrKey = langKey.key.split('.')
                            let langByRegional = {}
                            let idx = 0;
                            let prev = arrKey[0]
                            let translate = langKey.lang[regional]
                            recursiveGetObjectKey(arrKey, langByRegional, idx, prev, arrKey.length - 1, translate)

                            Object.assign(result[regional][dataFile.group_key_lang], langByRegional)
                        })
                    })
                }
            }
        })
    }

    return responseSuccess(res, result)
}

const recursiveGetObjectKey = (arrKey, result, idx, prevKey, number, translate) => {   
    if (number < 0) {
        return result
    }
    
    if (idx === 0) {
        Object.assign(result, {
            [arrKey[idx]]: number == 0 ? translate : {}
        })
    } else {
        Object.assign(result[prevKey], {
            [arrKey[idx]]: number == 0 ? translate : {}
        })
    }
    
    prevKey = arrKey[idx]
    number--
    idx++
    
    recursiveGetObjectKey(arrKey, result, idx, prevKey, number, translate)
}

module.exports = {
    getLanguagesSystem
}