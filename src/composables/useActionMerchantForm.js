import { isEmpty } from 'lodash'
import { useMerchantSelectedStore } from '@/stores/merchant-selected-today'
import { useModal } from "@/composables/useModal.js";
import { useSettingStore } from "@/stores/setting";
import MerchantInformation from '@/components/form/MerchantInformation.vue'

const { showModal } = useModal()
const settingStore = useSettingStore()
const merchantSelectedStore = useMerchantSelectedStore()

export default function useActionMerchantForm() {
    const openFormMerchantDetail = (merchantId, serviceCode) => {
        let detailId = null
        let isMerchantSelected = false

        let findMerchant = findMerchantSelectedById(merchantId, serviceCode)

        if (!isEmpty(findMerchant)) {
            detailId = findMerchant['detail_id']
            isMerchantSelected = true
        }

        let params = {
            merchant_id: merchantId,
            service_code: serviceCode,
            is_merchant_selected: isMerchantSelected,
            detail_id: detailId
        }

        setTimeout(() => {
            showModal(MerchantInformation, params)
        }, 100)
    }

    const findMerchantSelectedById = (merchantId, serviceCode) => {
        let listMerchantSelected = merchantSelectedStore.getByServiceCode(serviceCode)

        if (isEmpty(listMerchantSelected)) {
            return []
        }

        if (isEmpty(listMerchantSelected.merchants)) {
            return []
        }

        return listMerchantSelected.merchants.find(item => item.request_id == merchantId)
    }

    const getTotalMerchantSelected = (serviceCode) => {
        let listMerchantSelected = merchantSelectedStore.getByServiceCode(serviceCode)
        
        return !isEmpty(listMerchantSelected) ? listMerchantSelected.total_picked : 0
    }

    const checkReachedLimitSelectMerchant = (serviceCode) => {
        let limitSelectMerchant = settingStore.getLimitSelectMerchant
        let totalMerchantSelected = getTotalMerchantSelected(serviceCode)

        return totalMerchantSelected >= limitSelectMerchant
    }

    return {
        openFormMerchantDetail,
        findMerchantSelectedById,
        getTotalMerchantSelected,
        checkReachedLimitSelectMerchant
    }
}