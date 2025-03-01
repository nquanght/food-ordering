import { defineStore } from 'pinia'
import useAxios from "@/composables/useAxios.js";
import { urlAPIs } from "@/utils/constants.js"

const keyNameStorage = 'setting'

export const useSettingStore = defineStore(keyNameStorage, {
    state: () => ({
        setting: []
    }),
    actions: {
        async fetchData() {
            const axios = useAxios()
            const { urlGetAllSettingSystem } = urlAPIs

            await axios.get(urlGetAllSettingSystem)
                .then(res => {
                    if (res.data && res.data.data) {
                        
                        this.setting = res.data.data || []
                        localStorage.setItem(keyNameStorage, JSON.stringify(res.data.data))
                    }
                })
                .catch((err) => {
                    console.error(err.message)
                })
        },
        getSettingByKey (key) {
            let setting = []

            if (this.setting && this.setting[key]) {
                setting = this.setting[key]
            }

            return setting
        }
    },
    getters: {
        getListSetting (state) {
            return state.setting
        },
        getLimitSelectMerchant (state) {
            return state.setting && state.setting.picking ? state.setting.picking.limit : 0
        }
    }
})