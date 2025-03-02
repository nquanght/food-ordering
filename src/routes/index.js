const express = require('express')
const app = express()

const userRoutes = require('./user.js')
const adminRoutes = require('./admin.js')
const merchantRoutes = require('./merchant.js')
const pickingRoutes = require('./picking.js')
const foodRoutes = require('./food.js')
const settingRoutes = require('./system.js')

app.use('/', userRoutes)
app.use('/admin', adminRoutes)
app.use('/merchant', merchantRoutes)
app.use('/picking', pickingRoutes)
app.use('/food', foodRoutes)
app.use('/system', settingRoutes)

module.exports = app