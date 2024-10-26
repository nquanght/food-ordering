require('./src/constants')
const env = process.env.NODE_ENV || 'development'
const dotenv = require('dotenv');

dotenv.config({ path: `${ROOT_PATH}/.env.${env}`})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRoutes = require('./src/routes/userRoutes.js')
const app = express()

const port = process.env.DEV_PORT
// apply global variables

// enable cors - accept all origins
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// define routes
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`Connect server successfully`)
})