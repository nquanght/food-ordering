<template>
  <div class="admin-service-management">
    <div class="row align-items-center mx-0">
      <div
        class="col-6 col-sm-4 col-md-3 p-2"
        v-for="(data, idx) in dataFetch" :key="idx"
      >
        <div class="card border-0 box-shadow-card">
          <div v-if="data.status == 0" class="overlay-disable-item"></div>
          <div class="img-hover-zoom">
            <img
              :src="data.logo"
              :alt="`service-img-${data.name}`"
              class="rounded-top service-img"
              loading="lazy"
            >
          </div>
          <div class="p-3 text-center">
            <p class="text-ellipsis-1 mb-0">{{ data.name }}</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-4 col-md-3 d-flex justify-content-center align-items-center card-item">
        <div class="d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-circle" @click="addNewService">
            <font-awesome-icon icon="fa-solid fa-plus" size="xl"/>
          </button>
        </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useServiceStore} from '@/stores/services.js'

const dataFetch = ref([])
const serviceStore = useServiceStore()

onMounted(() => {
  fetchData()
})

const fetchData = () => {
  let data = serviceStore.getServices
  dataFetch.value = data
}

const addNewService = () => {
  alert('Hey !!!!')
}

</script>
  
<style lang="scss" scoped>
.admin-service-management {
  .card-item {
    height: 182px;
  }
  .service-img {
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