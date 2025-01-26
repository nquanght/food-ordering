import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastifyOptions = {
    autoClose: 2500,
    position: 'top-right',
    theme: 'light',
    closeOnClick: true
}
export default {
    install(app) {
        app.use(Vue3Toastify, toastifyOptions)
    }
}