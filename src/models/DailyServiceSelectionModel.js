const BaseModel = require('./BaseModel')
const tableName = 'daily_service_selection'

class DailyServiceSelectionModel extends BaseModel {
    constructor () {
        super(tableName)
    }
}

module.exports = DailyServiceSelectionModel