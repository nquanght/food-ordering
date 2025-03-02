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

</style>