import {useModalStore} from "@/stores/modal.js";

export function useModal() {
    const modalStore = useModalStore()

    const showModal = (modal, params = {}) => {
        if (modal) {
            modalStore.addModal(modal, params)
        }
    }

    return {
        showModal
    }
}