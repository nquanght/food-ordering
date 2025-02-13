import { defineStore } from 'pinia'
import { urlAPIs } from "@/utils/constants.js"
import { useConvertString } from "@/composables/common/useConvertString";
import useAxios from "@/composables/useAxios.js";
import moment from 'moment'
import { isEmpty } from 'lodash'

const convertString = useConvertString()
const { urlGetSelectedMerchantToday } = urlAPIs
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

            let urlSelectedMerchant = convertString.handleParamsUrl(urlGetSelectedMerchantToday, ':date', currentDate)

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