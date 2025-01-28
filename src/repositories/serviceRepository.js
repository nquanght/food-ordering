const ServiceModel = require('../models/ServiceModel')
const model = new ServiceModel()

const getServices = async () => {
    return await model.getAll()
}

const getServiceByCode = async (serviceCode) => {
    return await model.getFirstByCondition({
        code: serviceCode
    })
}

module.exports = {
    getServices,
    getServiceByCode
}
