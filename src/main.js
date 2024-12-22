import './assets/main.css'
import './assets/app.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {loadPlugins} from "./plugins";

import "@popperjs/core/dist/esm/popper.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import {useLanguageStore} from "@/stores/language.js";

const app = createApp(App)

app.config.productionTip = false;

app.use(createPinia())
app.use(router)

/* Load all plugins */
loadPlugins(app)

/* Fetch translations system */
const fetchLanguageSystem = async () => {
    const languageStore = useLanguageStore()
    await languageStore.fetchTranslations()
}

fetchLanguageSystem()

app.mount('#app')
