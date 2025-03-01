<template>
    <Modal
      :page-title="t('merchant.information.view_branches')"
      width="90%"
      :loading-form="loadingForm"
    >
      <template #content>
        <div class="merchant-branch-list px-3">

          <div class="card mb-4 border-0 d-flex justify-content-center align-items-center">
            <div class="merchant-brand-layer d-flex justify-content-center align-items-center">
              <div class="p-5">
                <h1 class="text-white text-center fw-bold pb-1">{{ dataBranches.brand_name }}</h1>
                <div class="text-white text-center">
                  {{ t('merchant.this_brand_having') }}
                  <span class="fw-bold">{{ dataBranches.total_branches }}</span>
                  {{ t('merchant.branch') }}
                </div>
              </div>
            </div>
            <div>
              <img :src="dataBranches.image" class="img-fluid object-fit-cover img-background-brand" alt="img-background-brand" onerror="this.onerror=null; this.src='/images/fall_back_merchant_branches.jpg';">
            </div>
          </div>

          <div class="row">
            <div class="col-6 col-sm-4 col-md-3 col-xxl-2 p-2" v-for="(data, idx) in dataBranches.branches_data" :key="idx">
              <div
                class="card border-0 cursor-pointer"
                @click="openFormMerchantDetail(data.merchant_id, serviceCode)"
              >
                <span 
                  v-if="!isEmpty(findMerchantSelectedById(data.merchant_id, serviceCode))" class="ribbon-card position-absolute translate-middle badge">{{ t('merchant.ribbon.label_picked') }}<span class="visually-hidden">unread messages</span>
                </span>
                <div v-if="!data.operating.is_open" class="overlay-disable-item" />
                <div v-if="!data.operating.is_open" class="out-of-stock">
                    <span class="text">{{ t('merchant.status.closed') }}</span>
                </div>
                <div class="img-hover-zoom">
                  <img :src="data.image" :alt="`merchant-img-${data.merchant_name}`" class="rounded-top merchant-img object-fit-cover" loading="lazy">
                </div>
                <div class="p-3 title-card">
                  <p class="text-ellipsis-2 fw-bold merchant-name" :title="data.merchant_name">{{ data.merchant_name }} </p>
                  <p class="text-ellipsis-1" :title="data.address"><small>{{ data.address }}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Modal>
</template>
  
<script setup>
import {useI18n} from "@/composables/useI18n.js";
import { ref, onBeforeMount } from "vue";
import { urlAPIs } from "@/utils/constants";
import { isEmpty } from "lodash";
import useAxios from "@/composables/useAxios.js";
import useActionMerchantForm from '@/composables/useActionMerchantForm';
import Modal from "@/components/common/Modal.vue";

const { openFormMerchantDetail, findMerchantSelectedById } = useActionMerchantForm()

const axios = useAxios()
const {urlGetMerchantBranches} = urlAPIs

const props = defineProps(['params'])
const {t} = useI18n()

const brandId = props.params.brand_id
const serviceCode = props.params.service_code

const loadingForm = ref(false)
const dataBranches = ref([])

onBeforeMount( () => {
    loadData()
})

const loadData = async () => {
  loadingForm.value = true

  let payload = {
      brand_id: brandId,
      service_code: serviceCode
  }

  await axios.post(urlGetMerchantBranches, payload)
    .then((res) => {
        dataBranches.value = res.data.data
        loadingForm.value = false
    })
    .catch((err) => {
        console.log(err.message)
        loadingForm.value = false
    }) 
}

</script>

<style scoped lang="scss">
  .card {
    border: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .2);

    span.ribbon-card {
      left: 88%;
      top: 4px;
      border-radius: 0px 0px 5px 5px;
      z-index: 1;
      background-color: rgba(4, 180, 64);
    }
  }

  .merchant-branch-list {
    overflow-y: auto;
    overflow-x: hidden;
    height: 75vh;
  }

  .merchant-brand-layer {
    position: absolute;
    width: 60%;
    height: 150px;
    background-color: rgba(0, 0, 0,.35);
    border-radius: 5px;
  }

  .img-background-brand {
    border: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .2);
    height: 300px;
  }

  .merchant-img {
    width: 100%;
    height: 150px;
  }

  .title-card {
    height: 90px;

    .merchant-name {
      height: 35px;
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
</style>