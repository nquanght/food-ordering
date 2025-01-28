const knex = require('knex')
const databaseConfig = require('../config/database')
const environment = process.env.NODE_ENV || "development";

/* Custom function query builder */
knex.QueryBuilder.extend('softDelete', () => {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return this.update({ deleted_at: timeNow });
});

const db = knex(databaseConfig[environment])

class BaseModel {
    tableName = ''

    constructor(tableName) {
        this.tableName = tableName
    }

    tableName() {
        return this.tableName
    }

    getDB () {
        return db(this.tableName)
    }

    async getAll() {
        return this.getDB().select('*')
    }

    async getById(id) {
        return this.getDB().where('id', id).first()
    }

    async getByCondition(condition) {
        return this.getDB().where(condition)
    }

    async getFirstByCondition(condition) {
        return this.getDB().where(condition).first()
    }

    async create(data) {
        return this.getDB().insert(data)
    }

    async update(id, data) {
        return this.getDB().where('id', id).update(data)
    }

    async delete(id) {
        return this.getDB().where('id', id).softDelete()
    }
}

module.exports = BaseModel
