<template>
  <Modal
    :page-title="t('merchant.information.selected_merchant')"
    width="50%"
    :loading-form="loadingForm"
  >
    <template #content>
      <div class="mb-3" v-html="getBadgeByService()" />
      <div v-for="(data, idx) in listMerchantSelected" :key="data.detail_id + idx + Math.random()" class="card mb-4">
        <div class="row g-0">
          <div class="col-md-5 img-hover-zoom">
            <img :src="data.image" class="img-fluid h-100 object-fit-cover" :alt="data.merchant_name">
          </div>
          <div class="col-md-7">
            <div class="d-flex flex-column justify-content-between p-3 h-100">
              <div class="info_merchant">
                <div class="card-title fs-5 fw-bold text-ellipsis-2">{{ data.merchant_name }}</div>
                <p class="card-text text-ellipsis-2">{{ data.address }}</p>
              </div>
              <div class="button d-flex justify-content-end">
                <div class="view_detail" :class="{'cursor-disable': loadingButton}">
                  <font-awesome-icon icon="fa-solid fa-eye" size="lg" class="cursor-pointer text-admin pe-3" @click="openFormMerchantDetail(data.merchant_id, serviceCode)"/>
                </div>
                <div class="unpick" :class="{'cursor-disable': loadingButton}">
                  <font-awesome-icon icon="fa-solid fa-trash" size="lg" class="cursor-pointer text-danger" @click="unpickMerchant(data.detail_id)"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { urlAPIs, eventName } from "@/utils/constants";
import { useI18n } from "@/composables/useI18n.js";
import { colors } from "@/utils/constants";
import { useEmitter } from "@/composables/useEmitter.js";
import { useMerchantSelectedStore } from '@/stores/merchant-selected-today'
import { isEmpty } from "lodash";
import useActionMerchantForm from "@/composables/useActionMerchantForm";
import useAxios from "@/composables/useAxios.js";
import Modal from "@/components/common/Modal.vue";

const { urlUnpickMerchant, urlGetListMerchantDetail } = urlAPIs
const { t } = useI18n()
const { openFormMerchantDetail } = useActionMerchantForm()
const merchantSelectedStore = useMerchantSelectedStore()
const axios = useAxios()
const emitter = useEmitter()
const props = defineProps(['params'])

const serviceCode = props.params.service_code
const serviceColor = colors.service[serviceCode]

const listMerchantSelected = ref([])
const loadingForm = ref(false)
const loadingButton = ref(false)

onMounted(async () => {
  await fetchDataDetailSelectedMerchant(true)
  emitter.$on(eventName.reloadDataSelectedMerchant, (listSelected) => {
    if (isEmpty(listSelected)) {
      emitter.$emit(eventName.close)
    } else {
      fetchDataDetailSelectedMerchant(true, listSelected)
    }
  })
})

const fetchDataDetailSelectedMerchant = async (enableLoading = false, listSelected = []) => {
  let dataMerchantSelected = []
  
  if (!isEmpty(listSelected)) {
    dataMerchantSelected = listSelected
  } else {
    let merchantSelected = merchantSelectedStore.getByServiceCode(serviceCode)

    if (merchantSelected && merchantSelected.merchants && merchantSelected.merchants.length > 0) {
      dataMerchantSelected = merchantSelected.merchants.map((item) => {
        return {
          request_id: item.request_id,
          detail_id: item.detail_id
        }
      })
    }

  }

  if (enableLoading) {
    loadingForm.value = true
  }
  loadingButton.value = true

  let payload = {
    service_code: serviceCode,
    data_merchant_selected: dataMerchantSelected
  }

  await axios.post(urlGetListMerchantDetail, payload)
    .then((response) => {
      listMerchantSelected.value = response.data.data

      if (listMerchantSelected.value.length > 1) {
        listMerchantSelected.value.sort((a, b) => b.detail_id - a.detail_id)
      }
      loadingForm.value = false
      loadingButton.value = false
    })
    .catch((err) => {
      loadingForm.value = false
      loadingButton.value = false
    })
}

const unpickMerchant = async (detailId) => {
  let payload = {
    detail_id: detailId,
  }
    
  await axios.post(urlUnpickMerchant, payload)
    .then(async (res) => {
      await merchantSelectedStore.fetchData()
      await fetchDataDetailSelectedMerchant()
      
      if (res.data.data && res.data.data.length == 0) {
        emitter.$emit(eventName.close)
      }
      
    })
    .catch((err) => {
      console.log(err.message);
    })
}

const getBadgeByService = () => {
  let backgroundColor = serviceColor.bg
  let textColor = serviceColor.text
  let strCode = serviceCode.split('_')
 
  let serviceName = serviceCode == 'be_food' ? serviceCode : capitalize(strCode[0])
  let suffixService = capitalize(strCode[1])

  let fontSize = '.8rem'
  let lineHeight = '1.3'
  
  return `
    <div class="badge align-middle" style="background-color: ${backgroundColor}; display: inline-block">
      <span style="color: ${textColor}; font-size: ${fontSize}; line-height: ${lineHeight}">${serviceName}</span><span class="fw-bold" style="color: ${textColor}; font-size: ${fontSize}; line-height: ${lineHeight}">${suffixService}</span>
    </div>
    `
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

</script>

<style scoped lang="scss">
  .card {
    border: none;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, .2);
  }

  .category-menu, .main-menu {
    position: sticky;
    top: 66px;
    height: 70vh;
    overflow-y: auto;
  }

  .overlay-disable-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 5px;
  }

  .out-of-stock {
    text-align: center;
    align-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    transform: rotate(-20deg);
    span.text {
      color: red;
      font-weight: bold;
      font-size: 1.75rem;
      text-shadow:
          -1px -1px 0px white,
          1px -1px 0px white,
          -1px 1px 0px white,
          1px 1px 0px white;
    }
  }

  .main-menu {
    overflow-x: hidden;
  }
  
</style>