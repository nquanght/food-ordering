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
                
                let countModals = this.modals.length
                let component = markRaw(modal)
                let isHighestModal = false

                switch (countModals) {
                    case 0:
                        isHighestModal = true
                        break;
                    default:
                        this.resetStatusModalBeforeCreate()
                        isHighestModal = true
                        break;
                }

                this.modals.push({
                    modal_name: modalName,
                    component: component,
                    is_highest_modal: isHighestModal,
                    params
                })
            }
        },
        closeModal () {
            if (this.modals && this.modals.length > 0) {
                this.modals = this.modals.filter((modal) => modal.is_highest_modal == false)
                this.resetStatusModalAfterClose()
            }
        },
        resetStatusModalBeforeCreate () {
            if (this.modals && this.modals.length > 0) {
                this.modals.forEach((modal) => {
                    modal.is_highest_modal = false
                })
            }
        },
        resetStatusModalAfterClose () {
            if (Object.keys(this.modals).length > 0) {
                if (Object.keys(this.modals).length == 1) {
                    this.modals[0]['is_highest_modal'] = true
                } else {
                    let lastIndexModal = Object.keys(this.modals).length - 1

                    this.modals.forEach((modal, index) => {
                        let isHighestModal = false

                        if (index == lastIndexModal) {
                            isHighestModal = true
                        }

                        modal.is_highest_modal = isHighestModal
                    })
                }
            }
        }
    },
    getters: {
        getListModal (state) {
            return state.modals
        }
    }
})