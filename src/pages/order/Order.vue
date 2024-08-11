<template>
  <div class="container">
    <div class="row d-flex justify-content-between">
      <div class="col-lg-8 col-sm-12">
        <div class="card card-cover">
          <div class="w-100">
            <img src="https://i.pinimg.com/736x/0e/7b/3a/0e7b3aa9e8b24ecf5e6a178fd43a7f66.jpg" class="card-img-top" style="height: 200px; object-fit: cover" alt="Image">
          </div>
          <div class="card-body px-4">
            <div class="header-photo fw-bold">
              <h4 class="fw-bold">Food Paradise - Parkson Lê Thánh Tôn</h4>
            </div>
            <div class="content-merchant">
              <div class="content-address">
                <font-awesome-icon icon="fa-solid fa-location-dot" width="20" height="20" class="pe-2"/>
                <span>Tầng 3, Tầng 3 Parkson Lê Thánh Tôn, 35Bis - 45 Lê Thánh Tôn Quận 1 Hồ Chí Minh</span>
              </div>
              <div class="content-website">
                <font-awesome-icon icon="fa-solid fa-globe" class="pe-2" width="20" height="20"/>
                <span>https://be.food.vn/familyfoodparadiseparksonlethanhton1</span>
              </div>
              <div class="content-opening-time d-flex justify-content-between">
                <div>
                  <font-awesome-icon icon="fa-solid fa-clock" class="pe-2" width="20" height="20"/>
                  <span class="text-success pe-4">{{ t('merchant.status.open') }}</span>
                  <span
                      class="text-primary cursor-pointer"
                      @click="openFormMerchantInfo"
                  >
                  {{ t('merchant.information.info') }}
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="category-list-wrapper d-flex mt-3">
          <button class="btn btn-prev" style="background-color: rgba(153, 153, 153, .2)" @click="scrollLeftMenu">
            <span class="text-gray"><font-awesome-icon icon="fa-solid fa-arrow-left-long" /></span>
          </button>

          <div class="category-list d-flex flex-row text-nowrap overflow-y-auto align-items-center mx-3 w-100" ref="scrollMenu">
            <div
                v-if="loadingData.category"
                class="placeholder-glow d-flex w-100 h-100 loading-skeleton-wrapper wrapper-horizontal"
            >
              <div v-for="number in 8" :class="`spacing-element placeholder col-${getRandomFlexColumn(3)}`"/>
            </div>
            <div v-else>
              <button
                  v-for="(category, idx) in dataFetch"
                  :key="idx"
                  type="button"
                  :class="`spacing-element btn btn-${activeMenu === category.category_id ? 'menu-active' : 'category'}`"
                  @click="(event) => handleActiveMenu(event, category.category_id, `category-${idx}`)"
              >
                <span class="pe-1">{{ category.category_name }}</span>
                <span class="badge" style="background-color: rgb(171, 206, 255); color: rgb(0, 36, 84)">{{ category.remain }}</span>
              </button>
            </div>
          </div>

          <button class="btn btn-next" style="background-color: rgba(153, 153, 153, .2)" @click="scrollRightMenu">
            <span class="text-gray"><font-awesome-icon icon="fa-solid fa-arrow-right-long" /></span>
          </button>
        </div>

        <div class="food-list-wrapper">
          <div v-if="loadingData.food" class="placeholder-glow loading-skeleton-wrapper wrapper-vertical">
            <div v-for="number in 5" :class="`placeholder col-${getRandomFlexColumn(9)}`"/>
          </div>
          <div v-else v-for="(category, catIdx) in dataFetch" :key="catIdx" class="mb-5" :id="`category-${catIdx}`">
            <h4 class="fw-bold mb-3">{{ category.category_name }}</h4>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              <div v-if="category.foods.length === 0">
                <span>Dữ liệu đang cập nhật...</span>
              </div>
              <div class="col" v-else v-for="(food, foodIdx) in category.foods" :key="foodIdx">
                <div class="card h-100">
                  <img
                    :src="food.thumbail_url"
                    :alt="food.food_name"
                    class="card-img-top"
                  >
                  <div class="card-body">
                    <h5 class="card-title fw-bold" style="font-size: 16px">{{ food.food_name }}</h5>
                    <p class="card-text text-ellipsis-2 text-gray" style="font-size: 14px">{{ food.description }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="food-price fw-bold">{{ food.price }}</div>
                      <div class="d-flex select-food-area">
                        <div
                          v-if="getDataSelected(food.food_id) !== -1"
                          class="btn-format button-minus"
                          @click="subtractQuantityFood(food.food_id)"
                        >
                          <font-awesome-icon icon="fa-solid fa-minus" size="xs"/>
                        </div>
                        <div
                          v-if="getDataSelected(food.food_id) !== -1"
                          class="total-select mx-3 fw-bold">{{ getDataSelected(food.food_id) }}</div>
                        <div
                          class="btn-format button-add"
                          @click="addQuantityFood(category.category_id, food.food_id)"
                        >
                          <font-awesome-icon icon="fa-solid fa-plus" size="xs"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 d-none d-lg-block">
        <div class="food-cart-list card card-cover">
          <div class="card-body d-flex flex-column align-items-center justify-content-center">
            <img src="../../../public/images/empty-cart.jpg" class="img-fluid" alt="empty-cart">
            <div class="text-center mb-3" style="color: #757575">{{ t('cart.status.empty') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {useModal} from "@/composables/useModal.js";
import {useI18n} from "@/composables/useI18n.js";
import Info from "@/pages/order/components/OpeningTimeMerchant.vue";
import useAxios from "@/composables/useAxios.js";
import {urlAPIs} from "@/utils/constants.js"

const {showModal} = useModal()
const {t} = useI18n()
const axios = useAxios()
const {getFoods} = urlAPIs

const scrollMenu = ref(null)
const activeMenu = ref(null)
const dataFetch = ref([])
const dataStore = ref([])
const loadingData = ref({
  category: false,
  food: false
})

onMounted(() => {
  fetchData()
  addEventScrollToActiveMenu()
})

onUnmounted(() => {
  removeEventScrollToActiveMenu()
})

const addEventScrollToActiveMenu = () => {
  window.addEventListener('scroll', () => activeMenuWhenScroll())
}

const removeEventScrollToActiveMenu = () => {
  window.removeEventListener('scroll', () => activeMenuWhenScroll())
}

const activeMenuWhenScroll = () => {
  let positionDetect = 0
  let heightMenu = 0
  let windowPageY = window.pageYOffset

  dataFetch.value.forEach((item, idx) => {
    let topElementCategory = document.getElementById(`category-${idx}`)

    const categoryBar = document.getElementsByClassName('category-list-wrapper')
    if (categoryBar && categoryBar.length > 0) {
      heightMenu = categoryBar[0].offsetHeight
    }

    if (topElementCategory && topElementCategory.offsetTop) {
      topElementCategory = topElementCategory.offsetTop

      if (heightMenu) {
        topElementCategory -= heightMenu + 10
      }

      if (topElementCategory - heightMenu < windowPageY) {
        positionDetect = idx
      }
    }
  })

  activeMenu.value = dataFetch.value[positionDetect].category_id
}

const handleActiveMenu = (evt, menuSelected, idxElement) => {
  activeMenu.value = menuSelected

  /* Handle scroll to section */
  const section = document.getElementById(idxElement)
  if (section) {
    const categoryBar = document.getElementsByClassName('category-list-wrapper')
    if (categoryBar && categoryBar.length > 0) {
      let heightCategory = categoryBar[0].offsetHeight
      let topSectionContent = section.offsetTop
      let scrollToTop = topSectionContent - heightCategory - 10

      window.scrollTo({top: scrollToTop, behavior: 'smooth'})
    }
  }
}

const scrollLeftMenu = () => {
  if (scrollMenu.value) {
    scrollMenu.value.scrollBy({ left: -300, behavior: 'smooth' });
  }
}

const scrollRightMenu = () => {
  if (scrollMenu.value) {
    scrollMenu.value.scrollBy({ left: 300, behavior: 'smooth' });
  }
}

const openFormMerchantInfo = () => {
  setTimeout(() => {
    showModal(Info, 'params')
  }, 100)
}

const fetchData = () => {
  loadingData.value.category = true
  loadingData.value.food = true
  axios.get(getFoods)
      .then((res) => {
        dataFetch.value = res.data
        loadingData.value.category = false
        loadingData.value.food = false
      })
      .catch((err) => {
        console.log(err.message)
        loadingData.value.category = false
        loadingData.value.food = false
      })
}

const addQuantityFood = (catId, foodId) => {
  let foundCategoryId = dataFetch.value.findIndex(itemCategory => itemCategory.category_id === catId)
  let food = {}

  if (foundCategoryId !== -1) {
    let foodsInCategory = dataFetch.value[foundCategoryId].foods

    let foundFoodId = foodsInCategory.findIndex(itemFood => itemFood.food_id === foodId)

    if (foundFoodId !== -1) {
      food = dataFetch.value[foundCategoryId].foods[foundFoodId]
    }
  }

  let foundFoodSelected = dataStore.value.findIndex(item => item.food_id === foodId)

  if (foundFoodSelected !== -1) {
    dataStore.value[foundFoodSelected].quantity += 1
  } else {
    food.quantity = 1
    dataStore.value.push(food)
  }
}

const subtractQuantityFood = (foodId) => {
  let foundFoodSelected = dataStore.value.findIndex(item => item.food_id === foodId)

  if (foundFoodSelected !== -1) {
    let food = dataStore.value[foundFoodSelected]

    if (food.quantity === 1) {
      dataStore.value.splice(foundFoodSelected, 1)
    } else {
      food.quantity -= 1
    }
  }
}

const getDataSelected = (foodId) => {
  let foundFoodSelected = dataStore.value.findIndex(item => item.food_id === foodId)

  if (foundFoodSelected === -1) {
    return foundFoodSelected
  } else {
    return dataStore.value[foundFoodSelected].quantity
  }
}

const getRandomFlexColumn = (maxCols) => {
  if (maxCols == null) {
    maxCols = 12
  }

  let randomNumber = Math.floor(Math.random() * 10) + 1

  if (randomNumber > maxCols) {
    randomNumber = maxCols
  }
  return randomNumber
}

</script>

<style lang="scss" scoped>
.card-cover {
  border: none;
  box-shadow: 0 1px 6px #dcdcdc;
}

.content-merchant {
  line-height: 2;
}

.btn-menu-active {
  background-color: rgb(8, 31, 66);
  color: white;
  font-weight: bold;
}

.food-cart-list {
  position: sticky;
  top: 3px;
  z-index: 2;
}

.category-list-wrapper {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: white;
  border-radius: 6px;
  border: none;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
  padding: 1rem 1rem 1rem 1rem;

  .spacing-element:not(:last-child) {
    margin-right: 15px;
  }
}

.food-list-wrapper {
  margin-top: 1rem;
  background-color: white;
  padding: 1.5rem 1rem 1.5rem 1rem;
  border-radius: 6px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
}

.food-list-wrapper .card {
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .2);
}

.btn-category {
  background-color: #eeeeee;
  transition: transform 0.3s ease;
}

.btn-category:hover {
  transform: scale(1.1);
}

.select-food-area {
  .btn-format {
    cursor: pointer;
    border-radius: 5px;
    padding: 1px 10px 1px 10px;
    text-align: center;
    vertical-align: middle;
    transition: transform 0.3s ease;
  }

  .btn-format:hover {
    transform: scale(1.1);
  }

  .button-minus {
    background-color: #f2f5f7;
  }
  .button-add {
    background-color: #fdc40c;
  }
}

.loading-skeleton-wrapper {
  &.wrapper-vertical {
    > div {
      display: block;

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }

  &.wrapper-horizontal {
    > div {
      display: block;

      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}

.category-list {
  scrollbar-width: none;
}
</style>

