const BaseModel = require('./BaseModel')
const tableName = 'service'
class ServiceModel extends BaseModel {
    constructor() {
        super(tableName)
    }
}

module.exports = ServiceModel