const model = require('../models/DailyServiceSelectionDetailModel')

const insertDataDetail = async (data) => {
    return await model.insert(data)
}

module.exports = {
    insertDataDetail
}
