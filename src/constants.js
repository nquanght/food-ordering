const path = require('path');

if (!global.ROOT_PATH) {
    global.ROOT_PATH = process.cwd()
}

if (!global.SOURCE_PATH) {
    global.SOURCE_PATH = path.join(ROOT_PATH, 'src')
}

if (!global.CONFIG_PATH) {
    global.CONFIG_PATH = path.join(SOURCE_PATH, 'config')
}

if (!global.CONTROLLER_PATH) {
    global.CONTROLLER_PATH = path.join(SOURCE_PATH, 'controllers')
}

if (!global.MODEL_PATH) {
    global.MODEL_PATH = path.join(SOURCE_PATH, 'models')
}

if (!global.SERVICE_PATH) {
    global.SERVICE_PATH = path.join(SOURCE_PATH, 'services')
}

if (!global.ROUTE_PATH) {
    global.ROUTE_PATH = path.join(SOURCE_PATH, 'routes')
}

if (!global.LANGUAGE_PATH) {
    global.LANGUAGE_PATH = path.join(MODEL_PATH, 'languages')
}

global.ACTIVE_STATUS = 1
global.INACTIVE_STATUS = 0
global.statusCode = {
    success: 200,
    created: 201,
    unauthorized: 401
}