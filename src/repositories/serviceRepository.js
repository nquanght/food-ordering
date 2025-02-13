const ServiceModel = require('../models/ServiceModel')

const getServices = async () => {
    return await ServiceModel.getAll()
}

const getServiceByCode = async (serviceCode) => {
    return await ServiceModel.getFirstByCondition({
        code: serviceCode
    })
}

const getServiceByCondition = async (condition) => {
    return await ServiceModel.getByCondition(condition)
}

module.exports = {
    getServices,
    getServiceByCode,
    getServiceByCondition
}
