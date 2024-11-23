const {responseSuccess} = require("../helpers/response");
const { getFood } = require("../repositories/foodRepository");
const { repairDataFood } = require("../services/foodService");

const getFoods = async (req, res) => {
    let requestId = 110218
    
    const foods = await getFood(requestId)
    
    const result = repairDataFood(foods)

    return responseSuccess(res, result)
}

module.exports = {
    getFoods
}