<template>
    <Modal
      :page-title="t('merchant.information.menu')"
      width="80%"
      :loading-form="loadingForm"
    >
      <template #content>
        <div class="row">
          <div class="col-4 col-sm-4 category-menu">
            <div
              class="mb-3 rounded py-1 px-2"
              v-for="(category, idxCategory) in dataMenu"
              :key="idxCategory"
            >
              <span
                class="cursor-pointer fw-bold"
                :style="{color: activeMenu == `category-${idxCategory}` ? serviceColor.bg : 'black'}"
                @click="scrollToCategory(`category-${idxCategory}`)"
              >{{ category.category_name }}</span>
            </div>
          </div>

          <div class="col-8 col-sm-8 main-menu" ref="foodView" @scroll="eventActiveMenuWhenScroll">
            <div
              class="mb-4"
              :class="`category-${idxCategory}`"
              v-for="(category, idxCategory) in dataMenu"
              :key="idxCategory"
            >
              <div class="fw-bold mb-2" style="font-size: 1.3rem;">{{ category.category_name }}</div>
              <div v-if="category.foods.length > 0" class="row">
                <div
                  v-for="(food, idxFood) in category.foods"
                  :key="idxFood"
                  class="col-6 col-md-4 mb-3"
                >
                  <div class="card h-100">
                    <div class="img-hover-zoom">
                      <img
                        :src="food.thumbnail_url"
                        :alt="food.food_name"
                        class="card-img-top"
                        loading="lazy"
                      >
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                      <div class="mb-3">
                        <h5 class="card-title fw-bold text-ellipsis-2" style="font-size: 1rem" :title="food.food_name">{{ food.food_name }}</h5>
                        <p class="card-text text-ellipsis-2 text-gray" style="font-size: .9rem" :title="food.description">{{ food.description }}</p>
                      </div>
                      <div v-if="food.discount_price">
                        <div style="font-size: .8rem" class="food-price text-secondary text-decoration-line-through">{{ formatCurrency(food.price) }}</div>
                        <div v-if="food.discount_price" style="font-size: .9rem" class="food-price fw-bold">{{ formatCurrency(food.discount_price) }}</div>
                      </div>
                      <div v-else>
                        <div v-if="food.price" style="font-size: .9rem" class="food-price fw-bold">{{ formatCurrency(food.price) }}</div>
                      </div>
                    </div>
                    <div v-if="food.is_out_of_stock" class="overlay-disable-item"/>
                    <div v-if="food.is_out_of_stock" class="out-of-stock">
                      <span class="text">{{ t('food.status.out_of_stock') }}</span>
                    </div>
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
import Modal from "@/components/common/Modal.vue";
import {useI18n} from "@/composables/useI18n.js";
import { ref, onBeforeMount } from "vue";
import { urlAPIs, colors } from "@/utils/constants";
const { urlGetMerchantFood } = urlAPIs
import useAxios from "@/composables/useAxios.js";
const axios = useAxios()

const props = defineProps(['params'])
const {t} = useI18n()
const loadingForm = ref(false)
const dataMenu = ref([])
const foodView = ref(null)
const activeMenu = ref(null)

const merchantId = props.params.id
const serviceCode = props.params.service_code
const serviceColor = colors.service[serviceCode]
const isOpening = props.params.is_opening

onBeforeMount(() => {
    loadData()
})

const loadData = async () => {
  loadingForm.value = true

  let payload = {
      id: merchantId,
      service_code: serviceCode
  }

  if (merchantId) {
    await axios.post(urlGetMerchantFood, payload)
    .then((res) => {
        dataMenu.value = res.data.data
        loadingForm.value = false
    })
    .catch((err) => {
        console.log(err.message)
        loadingForm.value = false
    })
  }  
}

const scrollToCategory = (classCategory) => {
  activeMenu.value = classCategory
  let section = document.getElementsByClassName(classCategory)

  if (section && section.length > 0) {
    let topElement = section[0].offsetTop

    if (foodView.value) {
      foodView.value.scrollTo({ top: topElement, behavior: 'smooth' });
    }
  }
}

const eventActiveMenuWhenScroll = (event) => {
  let totalMenu = dataMenu.value.length - 1

  let positionDetect = 0
  let heightSideBar = 0
  let windowPageY = event.target.scrollTop

  for (let idx = 0; idx <= totalMenu; idx ++) {
    let elementCategoryMenu = document.getElementsByClassName(`category-${idx}`)

    if (elementCategoryMenu && elementCategoryMenu.length > 0) {
      let topElementCategory = elementCategoryMenu[0].offsetTop

      const categoryMenuBar = document.getElementsByClassName('category-menu')
      if (categoryMenuBar && categoryMenuBar.length > 0) {
        heightSideBar = categoryMenuBar[0].clientHeight
      }

      if (heightSideBar) {
        topElementCategory += heightSideBar - 50
      }

      if (topElementCategory - heightSideBar < windowPageY) {
        positionDetect = idx
      }

      activeMenu.value = `category-${positionDetect}`
    }
    
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
  
</script>

<style scoped lang="scss">
  .card {
    border: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .2);
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