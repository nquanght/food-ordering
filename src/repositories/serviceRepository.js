const model = require('../models/ServiceModel')

const getServices = async () => {
    return await model.whereNull('deleted_at')
}

const getServiceByCode = async (serviceCode) => {
    return await model.whereNull('deleted_at')
                    .where('code', serviceCode)
}

module.exports = {
    getServices,
    getServiceByCode
}
