/* REPOSITORY */
const shopeeFoodRepository = require('../../repositories/services/shopeeFoodRepository')

const getMetaData = () => {
    return shopeeFoodRepository.getMetaData()
}

module.exports = {
    getMetaData
}