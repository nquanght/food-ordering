const {responseSuccess} = require("../helpers/response");

const foodRepository = require("../repositories/foodRepository");
const foodService = require("../services/foodService");

const getFoods = async (req, res) => {
    let requestId = 260673
    
    const foods = await foodRepository.getFood(requestId)
    
    const result = foodService.repairDataFood(foods)

    return responseSuccess(res, result)
}

module.exports = {
    getFoods
}