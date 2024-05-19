import popper from './popper.js'
import fontawesome from './font-awesome.js'

const listPlugins = [
    popper,
    fontawesome
]

function loadPlugins (app) {
    if (listPlugins && listPlugins.length > 0) {
        listPlugins.forEach((plugin) => {
            app.use(plugin)
        })
    }
}

export {loadPlugins}