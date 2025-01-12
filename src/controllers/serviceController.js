const {responseSuccess} = require("../helpers/response");
const serviceRepository = require("../repositories/serviceRepository")

const getServices = async (req, res) => {
    let result = await serviceRepository.getServices()
    return responseSuccess(res, result)
}

module.exports = {
    getServices
}