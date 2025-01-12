const axios = require('axios')
const model = require('../models/services')

const getServices = async () => {
    return await model.whereNull('deleted_at')
}

module.exports = {
    getServices
}
