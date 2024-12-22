const fs = require('fs')
const path = require('path');
const regionals = ['vi', 'en']

const getLanguageSystemByRegional = () => {
    let languageFiles = fs.readdirSync(LANGUAGE_PATH)
    let result = {}

    regionals.forEach((regional) => {
        Object.assign(result, {
            [regional]: {}
        })
    })

    if (languageFiles && languageFiles.length > 0) {

        languageFiles.forEach((file) => {
            let filePath = path.join(LANGUAGE_PATH, file)  
            let dataFile = require(filePath)

            if (dataFile.hasOwnProperty('group_lang') && dataFile.group_lang.length > 0) {  
                dataFile.group_lang.forEach((lang) => {
                    regionals.forEach((regional) => {
                        if (!result[regional].hasOwnProperty(dataFile.group_key_lang)) {
                            Object.assign(result[regional], 
                                {
                                    [dataFile.group_key_lang]: {}
                                }
                            )
                        }
                        getLangKey(lang, regional, result[regional][dataFile.group_key_lang])
                    })
                })
            }
        })
    }

    return result
}

const getLangKey = (lang, regional, result) => {
    let langKey = lang.key
    let langByRegional = lang.lang
    let arrLangKey = langKey.split('.')

    if (arrLangKey.length == 1) {
        result[arrLangKey[0]] = langByRegional[regional]
        return
    }

    if (arrLangKey.length > 1) {
        let value = langByRegional[regional]
        createNestedObject(arrLangKey, value, result)
    }
}

const createNestedObject = (arrays, value, result) => {
    let currentLevel = result;

    arrays.forEach((key, index) => {
            if (index === arrays.length - 1) {
                currentLevel[key] = value;
            } else {
                if (!currentLevel[key]) {
                    currentLevel[key] = {};
                }
                currentLevel = currentLevel[key];
            }
        });
};

module.exports = {
    getLanguageSystemByRegional
}