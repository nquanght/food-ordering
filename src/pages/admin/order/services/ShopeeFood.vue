<template>
    <div>
        <div class="search-merchant mb-3">
            <div class="search-box">
                <input class="text-box-search" type="text" :placeholder="t('admin.merchant.typing')" v-model="valueFindMerchant" @change="searchMerchant(valueFindMerchant)">
            </div>
        </div>

        <search-select :options="options" :multiple="true" />

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
                <div class="card border-0 box-shadow-card">
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
import { ref, defineProps } from 'vue'
import { urlAPIs } from '@/utils/constants';
import useAxios from "@/composables/useAxios.js";
import { useI18n } from '@/composables/useI18n';
import SearchSelect from '@/components/common/SearchSelect.vue'

const axios = useAxios()
const {t} = useI18n()
const props = defineProps({
  data: Object
})
 

const options = ref(
  [
    {id: 1, label: 'số 1'}, {id: 2, label: 'số 2'},
    {id: 3, label: 'số 3', children: [
      {id: 4, label: 'số 4'}
    ]}
  ])
const valueFindMerchant = ref('')
const listMerchant = ref([])
const loading = ref(false)
const timeOutSession = ref('')
const numberItemLoading = ref(30)

const searchMerchant = async (value) => {
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
        .catch(error => {
          loading.value = false
        })
    }, debounceTime);
  } else {
    listMerchant.value = []
  }
}
</script>

<style lang="scss" scoped>
.remove-space {
    margin-left: -0.4rem;
    margin-right: -0.4rem;
}
</style>