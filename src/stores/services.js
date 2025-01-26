import { defineStore } from 'pinia'
import useAxios from "@/composables/useAxios.js";
import { urlAPIs, acceptServiceType } from "@/utils/constants.js"
import { isEmpty } from 'lodash';

const keyNameStorage = 'services'

export const useServiceStore = defineStore(keyNameStorage, {
    state: () => ({
        services: []
    }),
    actions: {
        async fetchData() {
            const axios = useAxios()

            let serviceStorage = localStorage.getItem(keyNameStorage)
            
            /* Fetch new data services */
            if (isEmpty(serviceStorage)) {
                const {urlGetServices} = urlAPIs

                await axios.get(urlGetServices)
                    .then(res => {
                        if (res.data && res.data.data) {
                            this.services = res.data.data || []
                            localStorage.setItem(keyNameStorage, JSON.stringify(res.data.data))
                        }
                    })
                    .catch((err) => {
                        console.error(err.message)
                    })
            } else {
                serviceStorage = JSON.parse(serviceStorage)
                if (serviceStorage && serviceStorage.length > 0) {
                    this.services = serviceStorage
                }
            }
        },
        getServiceByCode (serviceCode) {
            let foundItem = this.services.findIndex(item => item.code == serviceCode)

            if (foundItem != -1) {
                return this.services[foundItem].id
            }

            return false
        },
        getServiceByType (serviceType) {
            if (!acceptServiceType.includes(serviceType)) {
                throw new Error("Invalid service type.");
            }

            let data = this.services.filter(item => item.type == serviceType)

            if (data && data.length > 0) {
                data.sort((a, b) => b.status - a.status)
            }

            return data
        }
    },
    getters: {
        getServices (state) {
            let data = state.services
            
            if (data && data.length > 0) {
                data.sort((a, b) => b.status - a.status)
            }
            return data
        }
    }
})