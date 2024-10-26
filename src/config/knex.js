const knex = require('knex')
const databaseConfig = require('./database')

const environment = process.env.NODE_ENV || "development";

module.exports = knex(databaseConfig[environment]);
