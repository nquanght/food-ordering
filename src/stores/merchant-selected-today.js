import { defineStore } from 'pinia'
import { useConvertUrl } from "@/composables/common/useConvertUrl";
import useAxios from "@/composables/useAxios.js";
import moment from 'moment'
import { isEmpty } from 'lodash'

const convertUrl = useConvertUrl()
const currentDate = moment().format('YYYY-MM-DD')
const keyNameStorage = 'merchant-selected-today'

export const useMerchantSelectedStore = defineStore(keyNameStorage, {
    state: () => ({
        merchant_selected: [],
        isFinishLoading: false
    }),
    actions: {
        async fetchData() {
            const axios = useAxios()

            let url = convertUrl.getUrlApi('picking', 'urlGetSelectedMerchantToday')
            let urlSelectedMerchant = convertUrl.handleParamsUrl(url, ':date', currentDate)

            if (urlSelectedMerchant) {
                await axios.get(urlSelectedMerchant)
                .then((response) => {
                    this.merchant_selected = response.data.data
                    this.isFinishLoading = true
                })
                .catch((err) => {
                    this.isFinishLoading = true
                })
            }  
        },
        getByServiceCode (serviceCode) {
            if (isEmpty(this.merchant_selected)) {
                return []
            }

            if (!this.merchant_selected.hasOwnProperty(serviceCode)) {
                return []
            }
            
            return this.merchant_selected[serviceCode]
        }
    },
    getters: {
        getAllMerchantSelectedToday (state) {
            return state.merchant_selected
        }
    }
})