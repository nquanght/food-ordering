<template>
    <div class="shopee-food-service">
        <div class="mb-3 row">
            <div class="search-box d-flex flex-wrap" style="width: 80%;">
              <input
                :disabled="disableSearchArea"
                :placeholder="t('admin.merchant.typing')"
                class="text-box-search me-3 col-6 col-sm-3 mb-2"
                type="text"
                v-model="valueFindMerchant"
              >
              <search-select
                :id-target="idTargetCities"
                :disabled="disableSearchArea"
                :clearable="false"
                :searchable="false"
                :options="optionCities"
                class="me-3 col-4 col-sm-2 mb-2"
                v-model:value="valueCities"
              />
              <search-select
                :id-target="idTargetDistricts"
                :disabled="disableSearchArea"
                :placeholder="t('common.select_district')"
                :options="optionDistricts"
                :multiple="true"
                :limit="0"
                :searchable="false"
                class="me-3 col-5 col-sm-2 mb-2"
                v-model:value="valueDistricts"
              />
              <search-select
                :id-target="idTargetServices"
                :disabled="disableSearchArea"
                :options="optionServices"
                :clearable="false"
                :searchable="false"
                class="me-3 col-4 col-sm-2 mb-2"
                v-model:value="valueServices"
              />
              <search-select
                :id-target="idTargetCategories"
                :disabled="disableSearchArea"
                :placeholder="t('common.select_service')"
                :options="optionCategories"
                :multiple="true"
                :limit="0"
                :searchable="false"
                class="col-5 col-sm-2 mb-2"
                v-model:value="valueCategories"
              />
            </div>
            <div class="d-flex align-items-start justify-content-end quantity-selection text-end" style="width: 20%;">
              <button
                type="button"
                :class="disableSearchArea ? 'disabled' : ''"
                class="btn bg-admin bg-remove-focus position-relative me-2"
                :title="t('common.search')"
                @click="searchMerchant"
              >
                <font-awesome-icon icon="fa-solid fa-magnifying-glass-location" size="lg" class="text-white"/>
              </button>

              <button
                type="button"
                :class="getTotalMerchantSelected(serviceCode) == 0 || disableSearchArea ? 'disabled' : ''"
                class="btn bg-admin bg-remove-focus position-relative"
                :title="t('button.form.detail_selected_merchant')"
                @click="openFormDetailSelectedMerchant"
              >
                <font-awesome-icon icon="fa-solid fa-utensils" size="lg" class="text-white"/>
                <span v-if="getTotalMerchantSelected(serviceCode) != 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{ 
                  getTotalMerchantSelected(serviceCode) }}<span class="visually-hidden">unread messages</span>
                </span>
              </button>
            </div>
        </div>

        <div v-if="loading" class="row align-items-center remove-space">
            <div v-for="(n, i) in numberItemLoading" :key="i"
                class="col-6 col-sm-4 col-md-3 col-xxl-2 p-2 placeholder-glow">
                <div class="card border-0 box-shadow-card placeholder w-100" style="height: 245px;"></div>
            </div>
        </div>
        <div v-else-if="listMerchant.length == 0" class="text-center py-2" style="background-color: #efefef; border-radius: 3px">
            <span class="fw-bold" style="color: #8c8c8c;">{{ t('common.empty_data') }}</span>
        </div>
        <div v-else class="row align-items-center remove-space">
            <div class="col-6 col-sm-4 col-md-3 col-xxl-2 p-2" v-for="(data, idx) in listMerchant" :key="idx">
              <div
                class="card border-0 box-shadow-card cursor-pointer"
                @click="openFormMerchantDetail(data.merchant_id, serviceCode)"
              >
                <span
                  v-if="!isEmpty(findMerchantSelectedById(data.merchant_id, serviceCode))"
                  class="ribbon-card position-absolute translate-middle badge">{{ t('merchant.ribbon.label_picked') }}<span class="visually-hidden">unread messages</span>
                </span>
                <div v-if="!data.is_open" class="overlay-disable-item" />
                <div v-if="!data.is_open" class="out-of-stock">
                    <span class="text">{{ t('merchant.status.closed') }}</span>
                </div>
                <div class="img-hover-zoom">
                  <img :src="data.image" :alt="`merchant-img-${data.name}`" class="rounded-top merchant-img" loading="lazy">
                </div>
                <div class="p-3 title-card">
                  <p class="text-ellipsis-2 fw-bold merchant-name" :title="data.name">{{ data.name }}</p>
                  <p class="text-ellipsis-1" :title="data.address"><small>{{ data.address }}</small></p>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { urlAPIs } from '@/utils/constants';
import { useI18n } from '@/composables/useI18n';
import { useModal } from "@/composables/useModal.js";
import { isEmpty } from 'lodash';
import { useMetaDataStore } from '@/stores/meta-data';
import useAxios from "@/composables/useAxios.js";
import MerchantSelected from '@/components/form/MerchantSelected.vue';
import useActionMerchantForm from '@/composables/useActionMerchantForm';
import SearchSelect from '@/components/common/SearchSelect.vue';

const {showModal} = useModal()
const {t} = useI18n()
const { openFormMerchantDetail, getTotalMerchantSelected, findMerchantSelectedById } = useActionMerchantForm()
const metaDataStore = useMetaDataStore()
const axios = useAxios()

const props = defineProps({
  data: Object
})

const valueFindMerchant = ref('')
const listMerchant = ref([])
const loading = ref(false)
const timeOutSession = ref('')
const numberItemLoading = ref(30)

const dataOptions = ref({
  cities: [],
  districts: [],
  services: [],
  categories: []
})
const optionCities = ref([])
const optionDistricts = ref([])
const optionServices = ref([])
const optionCategories = ref([])

const valueCities = ref(217) // id HCM
const valueDistricts = ref([])
const valueServices = ref(1) // Food
const valueCategories = ref([])

const idTargetCities = ref(Math.random())
const idTargetDistricts = ref(Math.random())
const idTargetServices = ref(Math.random())
const idTargetCategories = ref(Math.random())

const disableSearchArea = ref(false)

const dataCities = ref([])
const dataCategoryServices = ref([])

const serviceCode = props.data.service_code

onMounted(() => {
  getOptionsSearch()
})

watch(valueCities, (newVal) => {
  fillOptionsDataCities(newVal)
  valueDistricts.value = []

  /** Reset component tree select after change city */
  idTargetDistricts.value = Math.random()
})

watch(valueServices, (newVal) => {
  fillOptionsDataCategoryServices(newVal)
  valueCategories.value = []

  /** Reset component tree select after change service */
  idTargetCategories.value = Math.random()
})

const searchMerchant = async () => {
  let value = valueFindMerchant.value
  if (timeOutSession) {
    clearTimeout(timeOutSession)
  }

  let debounceTime = 200
  let url = urlAPIs.searchMerchant

  value = value.trim()

  if (!isEmpty(value)) {
    let payload = {
      key_word: value,
      service_code: serviceCode,
      city_ids: valueCities.value,
      district_ids: valueDistricts.value,
      service_ids: valueServices.value,
      category_ids: valueCategories.value
    }

    loading.value = true
    disableSearchArea.value = true

    timeOutSession.value = setTimeout(() => {
      axios.post(url, payload)
        .then(response => {
          listMerchant.value = response.data.data
          loading.value = false
          disableSearchArea.value = false
        })
        .catch(error => {
          loading.value = false
          disableSearchArea.value = false
        })
    }, debounceTime);
  } else {
    listMerchant.value = []
  }
}

const openFormDetailSelectedMerchant = () => {
  if (getTotalMerchantSelected(serviceCode) == 0) {
    return
  }

  let params = {
    service_code: serviceCode
  }

  setTimeout(() => {
    showModal(MerchantSelected, params)
  }, 100);
}

const getOptionsSearch = () => {
  let metaData = metaDataStore.getMetaDataByCode(serviceCode)
  
  dataCities.value = metaData.cities
  dataCategoryServices.value = metaData.category_services

  fillOptionsDataCities(valueCities.value)
  fillOptionsDataCategoryServices(valueServices.value)
}

const fillOptionsDataCities = (cityId) => {
  optionCities.value = []
  optionDistricts.value = []

  dataCities.value.forEach(data => {
    optionCities.value.push({
      id: data.city_id,
      label: data.city_name
    })

    if (data.districts && data.city_id == cityId) {
      data.districts.forEach(district => {
        optionDistricts.value.push({
          id: district.district_id,
          label: district.district_name
        })
      })
    }
  })
}

const fillOptionsDataCategoryServices = (serviceId) => {
  optionServices.value = []
  optionCategories.value = []

  dataCategoryServices.value.forEach(data => {
    if (isEmpty(data.categories)) {
      return
    }

    optionServices.value.push({
      id: data.service_id,
      label: data.service_name
    })

    if (data.categories && data.service_id == serviceId) {
      data.categories.forEach(category => {
        optionCategories.value.push({
          id: category.category_id,
          label: category.category_name
        })
      })
    }
  })
}

</script>

<style lang="scss" scoped>
.shopee-food-service {
  .remove-space {
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }

  span.ribbon-card {
    left: 83%;
    top: 4px;
    border-radius: 0px 0px 5px 5px;
    z-index: 1;
    background-color: rgba(4, 180, 64);
  }
}
</style>