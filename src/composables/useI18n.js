import {getCurrentInstance} from 'vue'

export function useI18n() {
    const internalInstance = getCurrentInstance()
    const i18n = internalInstance.appContext.config.globalProperties.i18n

    function t (key) {
        return i18n(key)
    }

    return { t }
}