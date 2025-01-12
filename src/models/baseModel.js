const knex = require('knex')
const databaseConfig = require('../config/database')

const environment = process.env.NODE_ENV || "development";

/* Custom function query builder */
knex.QueryBuilder.extend('softDelete', function () {
    let timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return this.update({ deleted_at: timeNow });
});

module.exports = knex(databaseConfig[environment]);
