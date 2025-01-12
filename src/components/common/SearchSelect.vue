<template>
<div class="search-select-wrapper">
    <tree-select
        v-model="value"
        :multiple="multiple"
        :options="options"
        :placeholder="placeholder"
    />
</div>
</template>

<script setup>
import TreeSelect from '@cholakovdev/vue3-treeselect'
import '@cholakovdev/vue3-treeselect/dist/vue3-treeselect.css'
import { ref } from 'vue';
import { useI18n } from '@/composables/useI18n';

const value = ref(null)
const {t} = useI18n()

defineProps({
  value: {
    type: Array,
    default: []
  },
  options: {
    type: Array,
    default: []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'fgfdg'
  }
})
</script>

<style>
</style>