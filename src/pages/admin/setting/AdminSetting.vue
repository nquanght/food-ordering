<template>
  <div class="admin-setting-general">
    <ul class="nav nav-tabs" role="tablist">
      <li v-for="(tabName, idx) in Object.keys(listSettingTab)" :key="idx" class="nav-item" role="presentation">
        <button
          :id="`${tabName}--tab`"
          :aria-controls="`${tabName}`"
          :data-bs-target="`#${tabName}`"
          class="nav-link"
          :class="{active: tabName === currentTab.tab_name}"
          type="button"
          role="tab"
          data-bs-toggle="tab"
          aria-selected="true"
          @click="changeTab(tabName)"
        >{{ t(`setting.tab.${tabName}`) }}</button>
      </li>
    </ul>
    
    <div class="tab-content">
      <component
        :is="componentTab"
        :data="currentTab"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, shallowRef, onMounted, onUnmounted } from 'vue'
import listSettingTab from './setting_system/define'
import {useI18n} from "@/composables/useI18n.js";

const {t} = useI18n()
const serviceInit = 'general'

// onMounted(() => {
  
// })

// onUnmounted(() => {
  
// })

const componentTab = computed(() => currentTab.value.component)

const currentTab = shallowRef({
  tab_name: serviceInit,
  component: listSettingTab[serviceInit]
})

const changeTab = (tabName) => {
  currentTab.value = {
    tab_name: tabName,
    component: listSettingTab[tabName]
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
      height: 38px;
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