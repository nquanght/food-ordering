<template>
    <div>
        <div class="search-merchant mb-3">
            <div class="search-box">
                <input class="text-box-search" type="text" :placeholder="t('admin.merchant.typing')" v-model="valueFindMerchant" @change="searchMerchant(valueFindMerchant)">
            </div>
        </div>

        <div v-if="loading" class="row align-items-center remove-space">
            <div v-for="(n, i) in numberItemLoading" :key="i"
                class="col-6 col-sm-4 col-md-3 col-xxl-2 p-2 placeholder-glow">
                <div class="card border-0 box-shadow-card placeholder w-100" style="height: 245px;"></div>
            </div>
        </div>
        <div v-else-if="listMerchant.length == 0">
            <span class="fw-bold text-success">{{ t('common.empty_data') }}</span>
        </div>
        <div v-else class="row align-items-center remove-space">
            <div class="col-6 col-sm-4 col-md-3 col-xxl-2 p-2" v-for="(data, idx) in listMerchant" :key="idx">
                <div
                  class="card border-0 box-shadow-card"
                  :class="{'cursor-pointer': data.is_open}"
                  @click="openFormMerchant(data)"
                >
                    <div v-if="!data.is_open" class="overlay-disable-item" />
                    <div v-if="!data.is_open" class="out-of-stock">
                        <span class="text">{{ t('merchant.status.closed') }}</span>
                    </div>
                    <div class="img-hover-zoom">
                        <img :src="data.image" :alt="`merchant-img-${data.name}`" class="rounded-top merchant-img"
                            loading="lazy">
                    </div>
                    <div class="p-3 title-card">
                        <p class="text-ellipsis-2 fw-bold merchant-name" :title="data.name">{{ data.name }}</p>
                        <p class="text-ellipsis-1" :title="data.address">{{ data.address }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { urlAPIs } from '@/utils/constants';
import useAxios from "@/composables/useAxios.js";
import { useI18n } from '@/composables/useI18n';
import { useModal } from "@/composables/useModal.js";
import MerchantInformation from '@/components/admin/MerchantInformation.vue';

const {showModal} = useModal()
const axios = useAxios()
const {t} = useI18n()
const props = defineProps({
  data: Object
})

const valueFindMerchant = ref('')
const listMerchant = ref([])
const loading = ref(false)
const timeOutSession = ref('')
const numberItemLoading = ref(30)
const serviceCode = props.data.service_code

const searchMerchant = async (value) => {
  if (timeOutSession) {
    clearTimeout(timeOutSession)
  }

  let debounceTime = 100
  let url = urlAPIs.searchMerchant

  value.trim()

  if (value !== '') {
    let payload = {
      key_word: value.trim(),
      service_code: serviceCode
    }

    loading.value = true
    timeOutSession.value = setTimeout(() => {
      axios.post(url, payload)
        .then(response => {
          listMerchant.value = response.data.data
          loading.value = false
        })
        .catch(error => {
          loading.value = false
        })
    }, debounceTime);
  } else {
    listMerchant.value = []
  }
}

const openFormMerchant = (dataMerchant) => {
  if (dataMerchant.is_open) {
    let params = {
      id: dataMerchant.id,
      service_code: serviceCode
    }

    setTimeout(() => {
      showModal(MerchantInformation, params)
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
.remove-space {
    margin-left: -0.4rem;
    margin-right: -0.4rem;
}
</style>