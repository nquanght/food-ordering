import { defineStore } from 'pinia'
import { markRaw } from 'vue'

export const useModalStore = defineStore('modal', {
    state: () => ({
        modals: [],
    }),
    actions: {
        addModal (modal, params) {
            if (modal) {
                let modalName = modal.__name
                this.modals.push({
                    modal_name: modalName,
                    component: markRaw(modal),
                    params
                })
            }
        },
        closeModal () {
            if (this.modals && this.modals.length > 0) {
                this.modals.pop()
            }
        }
    },
    getters: {
        getListModal (state) {
            return state.modals
        }
    }
})