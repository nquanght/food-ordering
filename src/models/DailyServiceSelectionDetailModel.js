const BaseModel = require('./BaseModel')
const tableName = 'daily_service_selection_detail'

class DailyServiceSelectionDetailModel extends BaseModel {
    constructor () {
        super(tableName)
    }
}

module.exports = DailyServiceSelectionDetailModel