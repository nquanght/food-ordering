import popper from './popper.js'
import fontawesome from './font-awesome.js'
import emitter from "@/plugins/emitter.js"
import {i18n, useI18n} from "@/plugins/vue-i18n.js";

const listPlugins = [
    popper,
    fontawesome,
    i18n
]

function loadPlugins (app) {
    if (listPlugins && listPlugins.length > 0) {
        listPlugins.forEach((plugin) => {
            app.use(plugin)
        })
    }

    /* Set global properties for instance */
    app.config.globalProperties.emitter = emitter;
    app.config.globalProperties.i18n = (args) => {
        const { t } = useI18n();
        return t(args);
    };
}

export {loadPlugins}