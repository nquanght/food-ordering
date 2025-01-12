const {responseSuccess} = require("../helpers/response");
const makeBusiness = require('../businesses/init')

const getMetaData = async (req, res) => {
    // sample business is shopee_food
    let serviceBusiness = makeBusiness('shopee_food')
    let result = await serviceBusiness.getMetaData()

    return responseSuccess(res, result)
}

module.exports = {
    getMetaData
}