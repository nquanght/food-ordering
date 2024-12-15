<template>
  <Modal
    :page-title="t('merchant.information.info')"
    width="50%"
  >
    <template #content>
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

      <div class="list-time-opening">
        <div class="fw-bold">{{ t('merchant.information.opening_time') }}:</div>
        <ul class="list-group">
          <li class="list-group-item" v-for="(dayOfWeek, idx) in weekDay" :key="idx">
            <span class="pe-2" :style="getClassOpeningTime(dayOfWeek)"><font-awesome-icon icon="fa-regular fa-calendar" /></span>
            <span :style="getClassOpeningTime(dayOfWeek)">{{ t(`common.${dayOfWeek}`) }}: {{ getOpeningTimeMerchant(dataMerchant, idx + 1) }}</span>
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
  </Modal>
</template>

<script setup>
import Modal from "@/components/common/Modal.vue";
// import CommentMerchant from "@/pages/order/components/CommentMerchant.vue";
import {useModal} from "@/composables/useModal.js";
import {useI18n} from "@/composables/useI18n.js";
import { ref, computed } from "vue";
import moment from "moment";

const props = defineProps(['params'])

const {showModal} = useModal()
const {t} = useI18n()

const dataMerchant = ref(props.params)
const weekDay = ref(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']) 

// const openFormRateMerchant = () => {
//   setTimeout(() => {
//     showModal(CommentMerchant, 'params')
//   }, 100)
// }

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

const getOpeningTimeMerchant = (dataWeekTime, dayOfWeek) => {
  let result = ''
  
  if (dataWeekTime.hasOwnProperty('week_day') && dataWeekTime.week_day.hasOwnProperty(dayOfWeek)) {
    let openingTimeList = dataWeekTime.week_day[dayOfWeek]

    result = []
    openingTimeList.forEach(item => {
      result.push(`${item.start_time} - ${item.end_time}`)
    })

    result = result.join(' | ')
  }

  return result
}

const getCurrentDay = (dayOfWeek) => {
  return moment().format('dddd').toLowerCase() === dayOfWeek
}

const getClassOpeningTime = (dayOfWeek) => {
  let merchantIsOpening = dataMerchant.value.operating.is_open
  
  if (getCurrentDay(dayOfWeek)) {
    if (merchantIsOpening) {
      return {color: dataMerchant.value.operating.color, fontWeight: 600}
    }

    return {color: 'rgb(151, 151, 151)', fontWeight: 600}
  }

  return ''
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

.list-time-opening {
  > ul > li {
    border: none;
  }
}
</style>