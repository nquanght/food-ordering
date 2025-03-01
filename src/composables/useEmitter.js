import {getCurrentInstance} from 'vue'

export function useEmitter() {
    const internalInstance = getCurrentInstance()
    const emitter = internalInstance.appContext.config.globalProperties.emitter

    function $emit (key, callback) {
        emitter.emit(key, callback)
    }

    function $on (key, callback) {
        emitter.on(key, callback)
    }

    function $off (key, callback = null) {
        emitter.off(key, callback)
    }

    return {
        emitter,
        $emit,
        $on,
        $off
    }
}