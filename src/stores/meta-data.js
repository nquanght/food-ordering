import { defineStore } from 'pinia'
import useAxios from "@/composables/useAxios.js";
import { urlAPIs } from "@/utils/constants.js"
import { isEmpty } from 'lodash';

const keyNameStorage = 'meta-data'

export const useMetaDataStore = defineStore(keyNameStorage, {
    state: () => ({
        metaData: []
    }),
    actions: {
        async fetchData() {
            const axios = useAxios()

            let metaDataStorage = localStorage.getItem(keyNameStorage)
            
            /* Fetch new meta data */
            if (isEmpty(metaDataStorage)) {
                const {urlGetMetaData} = urlAPIs

                await axios.post(urlGetMetaData)
                    .then(res => {
                        if (res.data && res.data.data) {
                            this.metaData = res.data.data || []
                            localStorage.setItem(keyNameStorage, JSON.stringify(res.data.data))
                        }
                    })
                    .catch((err) => {
                        console.error(err.message)
                    })
            } else {
                metaDataStorage = JSON.parse(metaDataStorage)
                if (!isEmpty(metaDataStorage)) {
                    this.metaData = metaDataStorage
                }
            }
        },
        getMetaDataByCode (serviceCode) {
            let metaData = null

            if (this.metaData && this.metaData[serviceCode]) {
                metaData = this.metaData[serviceCode]
            }

            return metaData
        }
    },
    getters: {
        getListMetaData (state) {
            return state.metaData
        }
    }
})