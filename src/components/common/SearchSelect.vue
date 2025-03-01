<template>
  <div class="search-select-wrapper" :dir="rtl ? 'rtl' : 'ltr'">
    <tree-select
      :disabled="disabled"
      :key="idTarget"
      v-model="modelValue"
      :multiple="multiple"
      :options="options"
      :placeholder="placeholder ? placeholder : t('common.select_prompt')"
      :clearable="clearable"
      :searchable="searchable"
      :limit="limit"
      :limit-text="(count) => `${count} ${t('common.selected_text')}`"
      :no-results-text="t('common.no_result_text')"
    />
  </div>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n';

const modelValue = defineModel()
const {t} = useI18n()

defineProps({
  options: {
    type: Array,
    default: []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  rtl: {
    type: Boolean,
    default: false
  },
  limit: {
    type: [Number, String],
    default: Infinity
  },
  disabled: {
    type: Boolean,
    default: false
  },
  idTarget: [Number, String]
})
</script>

<style lang="scss">
.search-select-wrapper {
  .vue-treeselect--focused:not(.vue-treeselect--open) .vue-treeselect__control {
    box-shadow: 1px 1px 3px #adadad;
    outline: none;
  }

  .vue-treeselect--disabled .vue-treeselect__single-value {
    position: absolute;
  }

  .vue-treeselect__control {
    height: 2.5rem;
    outline: none;
    border: 0;
    border-radius: 3px;
    box-shadow: 1px 1px 3px #adadad;

    .vue-treeselect__control-arrow-container svg {
      padding-bottom: 1px;
    }
  }

  .vue-treeselect--has-value .vue-treeselect__multi-value {
    margin-bottom: 0;
    
    .vue-treeselect__limit-tip {
      float: right;
      .vue-treeselect__limit-tip-text {
        padding-bottom: 3px;
        color: #333;
      }
    }
    
  }

  .vue-treeselect__menu-container {
    .vue-treeselect__menu {
      border: 0;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      // border-radius: 3px 30px 30px 3px;
      box-shadow: 1px 1px 3px #adadad;
    }
  }

  .vue-treeselect--single .vue-treeselect__option--selected {
    background: var(--text-admin);
    color: white;
  }

  .vue-treeselect__checkbox--checked {
    border-color: var(--text-admin);
    background: var(--text-admin);

    &:hover {
      border-color: var(--text-admin);
      background: var(--text-admin);
    }
  }

  .vue-treeselect__checkbox--checked, .vue-treeselect__label-container:hover .vue-treeselect__checkbox--checked {
    border-color: var(--text-admin);
    background: var(--text-admin);
  }

  .vue-treeselect__label-container:hover .vue-treeselect__checkbox--unchecked {
    border-color: var(--text-admin);
  }
  
}
</style>