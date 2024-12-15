<template>
  <div class="admin-order">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Tìm quán</span>
      <input
        type="text" class="form-control"
        v-model="valueFindMerchant"
        @change="searchMerchant(valueFindMerchant)"
      >
    </div>

    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else-if="listMerchant.length == 0">
      <span class="fw-bold text-success">Không có kết quả</span>
    </div>
    <div v-else class="row align-items-center mx-0">
      <div
        class="col-6 col-sm-4 col-md-3 col-xxl-2 p-2"
        v-for="(data, idx) in listMerchant" :key="idx"
      >
        <div class="card border-0 shadow-sm">
          <div v-if="!data.is_open" class="overlay-disable-item"/>
          <div v-if="!data.is_open" class="out-of-stock">
            <span class="text">{{ t('merchant.status.closed') }}</span>
          </div>
          <div class="img-hover-zoom">
            <img
              :src="data.image"
              :alt="`merchant-img-${data.name}`"
              class="rounded-top merchant-img"
              loading="lazy"
            >
          </div>
          <div class="p-3 title-card">
            <p class="text-ellipsis-2 fw-bold merchant-name">{{ data.name }}</p>
            <p class="text-ellipsis-1">{{ data.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { urlAPIs } from '@/utils/constants';
import useAxios from "@/composables/useAxios.js";
import { useI18n } from '@/composables/useI18n';
const axios = useAxios()
const {t} = useI18n()

const valueFindMerchant = ref('')
const listMerchant = ref([])
const loading = ref(false)
const timeOutSession = ref('')

const searchMerchant = (value) => {
  if (timeOutSession) {
    clearTimeout(timeOutSession)
  }

  let debounceTime = 100
  let url = urlAPIs.searchMerchant

  value.trim()

  if (value !== '') {
    let payload = {
      key_word: value.trim()
    }

    loading.value = true
    timeOutSession.value = setTimeout(() => {
      axios.post(url, payload, {})
        .then(response => {
          listMerchant.value = response.data.data
          loading.value = false
        })
    }, debounceTime);
  } else {
    listMerchant.value = []
  }
}
</script>

<style lang="scss" scoped>
.admin-order {
  .card-item {
    height: 182px;
  }
  .merchant-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  .btn-circle {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.33;
    border-radius: 35px;
    background-color: white;
    border-color: cadetblue;
    color: cadetblue;

    &:hover {
      background-color: cadetblue;
      color: white;
    }
  }

  .title-card {
    height: 95px;

    .merchant-name {
      height: 40px;
    }
  }

  .overlay-disable-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .out-of-stock {
    text-align: center;
    align-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
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
}

</style>