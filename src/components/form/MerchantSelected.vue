<template>
  <Modal
    :page-title="t('merchant.information.selected_merchant')"
    width="50%"
    :loading-form="loadingForm"
  >
    <template #content>
      <div class="mb-3 d-flex justify-content-between align-content-center">
        <div v-html="getBadgeByService()" />
        <!-- <div>
          <button type="button" class="btn-delete bg-danger">
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </button>
        </div> -->
      </div>

      <div
        v-for="(data, idx) in listMerchantSelected" :key="data.detail_id + idx + Math.random()" 
        class="card mb-4"
      >
        <span
          :style="{backgroundColor: data.operating.is_open ? data.operating.color : 'rgb(151, 151, 151)'}"
          class="ribbon-card position-absolute translate-middle badge">{{ data.operating.is_open ? t('merchant.status.open') : t('merchant.status.closed') }}<span class="visually-hidden">unread messages</span>
        </span>
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
import { eventName } from "@/utils/constants";
import { useConvertUrl } from "@/composables/common/useConvertUrl";
import { useI18n } from "@/composables/useI18n.js";
import { colors } from "@/utils/constants";
import { useEmitter } from "@/composables/useEmitter.js";
import { useMerchantSelectedStore } from '@/stores/merchant-selected-today'
import { isEmpty } from "lodash";
import useActionMerchantForm from "@/composables/useActionMerchantForm";
import useAxios from "@/composables/useAxios.js";
import Modal from "@/components/common/Modal.vue";

const { t } = useI18n()
const { openFormMerchantDetail } = useActionMerchantForm()
const merchantSelectedStore = useMerchantSelectedStore()
const axios = useAxios()
const convertUrl = useConvertUrl()
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

onUnmounted(() => {
  emitter.$off(eventName.reloadDataSelectedMerchant)
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

  let url = convertUrl.getUrlApi('merchant', 'urlGetListMerchantDetail')

  await axios.post(url, payload)
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
  
  let url = convertUrl.getUrlApi('picking', 'urlUnpickMerchant')

  await axios.post(url, payload)
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
  span.ribbon-card {
    left: 92%;
    top: 4px;
    border-radius: 0px 0px 5px 5px;
    z-index: 1;
    background-color: rgba(4, 180, 64);
  }
  .card {
    border: none;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, .2);
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

  .btn-delete {
    border: none;
    box-shadow: 0px 1px 3px rgba(0,0,0,.5);
    border-radius: 5px;
    background-color: rgba(95, 158, 160, 0.8);
    color: white;
    padding: 4px 8px;
    transition: background-color 300ms ease-out 10ms, color 200ms ease-out 10ms;
  
    &:hover {
      background-color: var(--text-admin);
      color: white;
      animation: ease;
    }
  }
  
</style>