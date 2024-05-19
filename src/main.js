import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {loadPlugins} from "./plugins";

import "@popperjs/core/dist/esm/popper.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.config.productionTip = false;

app.use(createPinia())
app.use(router)

loadPlugins(app)

app.mount('#app')
