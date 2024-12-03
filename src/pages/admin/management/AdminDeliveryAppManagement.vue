<template>
  <div class="admin-delivery-app-management">
    <div class="row align-items-center mx-0">
      <div
        class="col-6 col-sm-4 col-md-3 p-2"
        v-for="(data, idx) in dataFetch" :key="idx"
      >
        <div class="card border-0 shadow-sm">
          <div class="img-hover-zoom">
            <img
              :src="data.logo"
              :alt="`delivery-app-img-${data.name}`"
              class="rounded-top delivery-app-img"
            >
          </div>
          <div class="p-3 text-center">
            <span class="user-select-none">{{ data.name }}</span>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-4 col-md-3 d-flex justify-content-center align-items-center card-item">
        <div class="d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-circle" @click="addNewDeliveryApp">
            <font-awesome-icon icon="fa-solid fa-plus" size="xl"/>
          </button>
        </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
import {onMounted, onUnmounted, ref, computed} from "vue";
import useAxios from "@/composables/useAxios.js";
import {urlAPIs} from "@/utils/constants.js"

const {urlGetDeliveryApp} = urlAPIs
const axios = useAxios()
const dataFetch = ref([])

onMounted(() => {
  fetchData()
})

const fetchData = () => {
  // loadingData.value.category = true
  // loadingData.value.food = true
  axios.get(urlGetDeliveryApp)
      .then((res) => {
        dataFetch.value = res.data.data
        // loadingData.value.category = false
        // loadingData.value.food = false
      })
      .catch((err) => {
        console.log(err.message)
        // loadingData.value.category = false
        // loadingData.value.food = false
      })
}

const addNewDeliveryApp = () => {
  alert('Hey !!!!')
}

</script>
  
<style lang="scss" scoped>
.admin-delivery-app-management {
  .card-item {
    height: 182px;
  }
  .delivery-app-img {
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
}

</style>