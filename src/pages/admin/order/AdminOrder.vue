<template>
  <div class="admin-order">
    <ul class="nav nav-tabs" role="tablist">
      <li v-for="(service, idx) in services" :key="idx" class="nav-item" role="presentation">
        <button
          v-if="service.status === 1"
          :id="`${service.code}--tab`"
          :aria-controls="`${service.code}`"
          :data-bs-target="`#${service.code}`"
          class="nav-link"
          :class="{active: service.code === currentTab.service_code}"
          type="button"
          role="tab"
          data-bs-toggle="tab"
          aria-selected="true"
          @click="changeTab(service)"
        >{{ service.name }}</button>
        <button
          v-else
          :id="`${service.code}--tab`"
          :class="'nav-link disabled'"
        >{{ service.name }}</button>
      </li>
    </ul>
    
    <!-- Tabs content -->
    <div class="tab-content">
      <keep-alive>
        <component :is="componentService" :data="currentTab" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, shallowRef } from 'vue'
import { useServiceStore } from '@/stores/services'
import listServiceDefault from './services/define'
const serviceStore = useServiceStore()

const serviceInit = 'shopee_food'
const serviceType = 'external'

const currentTab = shallowRef({
  service_code: serviceInit,
  service_id: serviceStore.getServiceByCode(serviceInit),
  component: listServiceDefault[serviceInit]
})

const services = ref(serviceStore.getServiceByType(serviceType))
const componentService = computed(() => currentTab.value.component)

const changeTab = (service) => {
  currentTab.value = {
    service_code: service.code,
    service_id: service.id,
    component: listServiceDefault[service.code]
  }
}
</script>

<style lang="scss">
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

  .search-merchant {
    .search-box {
      input.text-box-search {
        width: 25%;
      }
    }
  }
}

</style>