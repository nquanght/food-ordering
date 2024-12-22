const {responseSuccess} = require("../helpers/response");
const deliveryAppRepository = require("../repositories/deliveryAppRepository")

const getDeliveryApps = async (req, res) => {
    let result = await deliveryAppRepository.getDeliveryApp()
    return responseSuccess(res, result)
}

module.exports = {
    getDeliveryApps
}