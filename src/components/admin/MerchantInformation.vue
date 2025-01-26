<template>
    <Modal
      :page-title="t('merchant.information.info')"
      width="50%"
      :loading-form="loadingForm"
    >
      <template #content>
        <div class="d-flex align-items-center mb-2">
          <font-awesome-icon
            icon="fa-solid fa-circle" size="sm" class="pe-2" width="8" height="8"
            :style="{color: merchantIsOpening ? dataMerchant.operating.color : 'rgb(151, 151, 151)'}"
          />
          <div style="color: #329900; font-size: .9rem;" class="fw-bold lh-1">{{ t(`merchant.status.${merchantIsOpening ? 'open' : 'closed'}`) }}</div>
        </div>

        <div class="fs-5 fw-bold">{{ dataMerchant.merchant_name }}</div>

        <hr class="break-line-dashed text-gray"/>
  
        <div class="fs-6 address-merchant">
          <span class="fw-bold pe-2">{{ t('merchant.information.address') }}:</span>
          <span>{{ dataMerchant.address }}</span>
        </div>
        <div class="fs-6 rate-merchant d-flex align-items-center">
          <span class="fw-bold pe-2">{{ t('merchant.information.rate') }}:</span>
          <div>
            <span class="pe-2" style="font-size: 13px;">{{ dataMerchant.rating.avg }}</span>
            <span v-for="(icon, idx) in getDataStarRating(dataMerchant.rating.avg)" :key="idx">
              <font-awesome-icon :icon="icon" color="orange" size="1x"/>
            </span>
          </div>
        </div>

        <hr class="break-line-dashed text-gray"/>
        
        <div class="website">
          <div v-html="getBadgeByService(serviceCode, dataMerchant.url)"/>
        </div>
  
        <hr class="break-line-dashed text-gray"/>
  
        <div class="list-time-opening">
          <div class="fw-bold">{{ t('merchant.information.opening_time') }}:</div>
          <ul class="list-group">
            <li class="list-group-item">
              <span class="pe-2" :style="getClassOpeningTime"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
              <span :style="getClassOpeningTime">{{ t(`common.${defineWeekDay[currentDate - 1]}`) }}: {{ getOpeningTimeMerchant }}</span>
            </li>
          </ul>
        </div>
  
        <hr class="break-line-dashed text-gray"/>
  
        <div>
          <div class="fw-bold mb-2">{{ t('merchant.information.map') }}:</div>
          <div>
            <iframe
              :src="`https://maps.google.com/maps?q=${dataMerchant.position.latitude},${dataMerchant.position.longitude}&hl=vi&z=14&amp;output=embed`"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen=""
              referrerpolicy="no-referrer-when-downgrade"
              loading="lazy"
            />
          </div>
        </div>
      </template>
      <template #button-form>
        <button
          type="button"
          class="btn-form bg-admin"
          @click="pickMerchant"
        >
            <span>{{ t('admin.form.button_select_merchant') }}</span>
        </button>
        <button
          type="button"
          class="btn-form"
          :style="{color: serviceColor.text, backgroundColor: serviceColor.bg}"
          @click="viewMenu"
        >
            <span>{{ t('admin.form.button_view_menu') }}</span>
        </button>
      </template>
    </Modal>
</template>
  
<script setup>
import Modal from "@/components/common/Modal.vue";
import {useI18n} from "@/composables/useI18n.js";
import { ref, computed, onBeforeMount } from "vue";
import { urlAPIs, colors, eventName } from "@/utils/constants";
const { urlGetMerchantDetail, urlPickMerchant } = urlAPIs
import useAxios from "@/composables/useAxios.js";
import {useModal} from "@/composables/useModal.js";
import MenuMerchant from "./MenuMerchant.vue";
import { useEmitter } from "@/composables/useEmitter.js";

const emitter = useEmitter()
const {showModal} = useModal()
const axios = useAxios()

const props = defineProps(['params'])
const {t} = useI18n()

const defineWeekDay = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const currentDate = new Date().getDay() == 0 ? 7 : new Date().getDay()

const dataMerchant = ref({})
const loadingForm = ref(false)
const merchantId = props.params.id
const serviceCode = props.params.service_code
const serviceColor = colors.service[serviceCode]

onBeforeMount(() => {
    loadData()
})

const merchantIsOpening = computed(() => dataMerchant.value.operating.is_open)

const getClassOpeningTime = computed(() => {
  if (merchantIsOpening.value) {
    // return {color: dataMerchant.value.operating.color, fontWeight: 700}
    return {color: 'black'}
  }
  return {color: 'rgb(151, 151, 151)', fontWeight: 700}
})

const getOpeningTimeMerchant = computed(() => {
  let result = ''
  
  if (dataMerchant.value.hasOwnProperty('week_day') && dataMerchant.value.week_day.hasOwnProperty(currentDate)) {
    let openingTimeList = dataMerchant.value.week_day[currentDate]

    result = []
    openingTimeList.forEach(item => {
      result.push(`${item.start_time} - ${item.end_time}`)
    })

    result = result.join(' | ')
  } else {
    result = t('merchant.information.close_temporarily')
  }

  return result
})

const loadData = async () => {
  loadingForm.value = true

  let payload = {
      id: merchantId,
      service_code: serviceCode
  }

  if (merchantId) {
    await axios.post(urlGetMerchantDetail, payload)
    .then((res) => {
        dataMerchant.value = res.data.data
        loadingForm.value = false
    })
    .catch((err) => {
        console.log(err.message)
        loadingForm.value = false
    })
  }  
}

const viewMenu = async () => {
  let params = {
    id: merchantId,
    service_code: serviceCode,
    merchant_name: dataMerchant.value.merchant_name,
    is_opening: dataMerchant.value.operating.is_open == 1
  }

  setTimeout(() => {
    showModal(MenuMerchant, params)
  }, 100)
}

const pickMerchant = async () => {
  if (merchantId) {
    let payload = {
      id: merchantId,
      service_code: serviceCode
    }
    
    await axios.post(urlPickMerchant, payload)
      .then((res) => {
        emitter.$emit(eventName.close)
      })
      .catch((err) => {
        console.log(err.message);
      })
  }
}
  
const getDataStarRating = (ratePoints) => {  
  let rateStaring = []
  let maxStarRating = 5

  let fullStar = 'fa-solid fa-star'
  let halfStar = 'fa-solid fa-star-half-stroke'
  let emptyStar = 'fa-regular fa-star'

  let integerPart = Math.floor(ratePoints);
  let isPositive = Number.isInteger(ratePoints);

  for (let point = 1; point <= maxStarRating; point ++) {
    if (point <= integerPart) {
      rateStaring.push(fullStar)
    } else {
      if (((point - 1) == integerPart) && !isPositive) {
        rateStaring.push(halfStar)
      } else {
        rateStaring.push(emptyStar)
      }
    }

  }

  return rateStaring
}

const getBadgeByService = (serviceCode, url) => {
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
    <a href="${url}" target="_blank" class="url-merchant text-decoration-none align-middle ps-1">${url}</a>
    `
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
  
</script>
<style scoped lang="scss">
  .rate-merchant {
    >div {
      >span {
        font-size: 1.1rem;
      }
    }
  }

  a.url-merchant {
    color: black;

    &:hover {
      color: #0d6efd;
    }
  }
  
  .list-time-opening {
    > ul > li {
      border: none;
    }
  }
</style>