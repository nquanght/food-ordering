import {getCurrentInstance} from 'vue'

export function useEmitter() {
    const internalInstance = getCurrentInstance()
    const emitter = internalInstance.appContext.config.globalProperties.emitter

    function $emit (key) {
        emitter.emit(key)
    }

    function $on (key, callback) {
        emitter.on(key, callback)
    }

    return {
        emitter,
        $emit,
        $on
    }
}