const {responseSuccess} = require("../helpers/response");

const getAllSettingSystem = (req, res) => {
    let result = {
        picking: {
            limit: 5
        }
    }

    return responseSuccess(res, result)
}

module.exports = {
    getAllSettingSystem
}