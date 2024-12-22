const axios = require('axios')
const model = require('../models/deliveryApp')

const getDeliveryApp = async () => {
    return await model.whereNull('deleted_at')
}

module.exports = {
    getDeliveryApp
}
