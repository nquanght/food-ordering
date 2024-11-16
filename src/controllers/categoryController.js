const {responseSuccess} = require("../helpers/response");

const getCategories = (req, res) => {
    return responseSuccess(res, categories)
}

module.exports = {
    getCategories
}