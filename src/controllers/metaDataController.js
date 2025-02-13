const { responseSuccess } = require("../helpers/response");
const makeBusiness = require('../businesses/init')
const { isEmpty } = require('lodash')

const getMetaData = async (req, res) => {

    let shopeeFoodBusiness = makeBusiness('shopee_food')
    let shopeeFoodMetaData = await shopeeFoodBusiness.getMetaData()

    let grabFoodBusiness = makeBusiness('grab_food')
    let grabFoodMetaData = await grabFoodBusiness.getMetaData()

    let beFoodBusiness = makeBusiness('be_food')
    let beFoodMetaData = await beFoodBusiness.getMetaData()

    let result = {
        shopee_food: shopeeFoodMetaData,
        grab_food: grabFoodMetaData,
        be_food: beFoodMetaData,
    }

    return responseSuccess(res, result)
}

module.exports = {
    getMetaData
}