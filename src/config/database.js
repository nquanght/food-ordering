const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development'
dotenv.config({ path: `../../.env.${env}`})

module.exports = {
    /* Development */
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
        migrations: {
            tableName: 'migrations',
            directory: '../migrations',
        },
        seeds: {
            directory: '../seeders',
        },
    },

    /* Production */
    // production: {
    //     client: 'postgresql',
    //     connection: {
    //         database: 'my_db',
    //         user:     'username',
    //         password: 'password'
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10
    //     },
    //     migrations: {
    //         tableName: 'migrations',
    //         directory: '../migrations',
    //     }
    // }
};
