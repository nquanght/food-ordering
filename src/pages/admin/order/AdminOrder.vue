<template>
  <div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Tìm quán</span>
      <input
        type="text" class="form-control"
        aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
        v-model="valueFindMerchant"
        @change="sendMsg(valueFindMerchant)"
      >
    </div>

    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else-if="listResult.length == 0">
      <span class="fw-bold text-success">Không có kết quả</span>
    </div>
    <div v-else>
      <div v-for="data, key in listResult" :key="key" class="mb-2">
        <div class="fw-bold">{{ data.name }}</div>
        <div>{{ data.address }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { urlAPIs } from '@/utils/constants';
import useAxios from "@/composables/useAxios.js";
const axios = useAxios()

const valueFindMerchant = ref('')
const listResult = ref([])
const loading = ref(false)
const timeOutSession = ref('')

const sendMsg = (value) => {
  if (timeOutSession) {
    clearTimeout(timeOutSession)
  }

  let debounceTime = 500
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
          listResult.value = response.data.data
          loading.value = false
        })
    }, debounceTime);
  } else {
    listResult.value = []
  }
}
</script>

<style>

</style>