<template>
  <div class="language-switch">
    <Popper
        class="light-theme"
        arrow
    >
      <img
        class="image-icon-language"
        :src="`/icons/${currentLanguage}-flag.png`"
        :alt="`icon-language-${currentLanguage}`"
      />
        <template #content="{ close }">
          <div class="list-language-images">
            <div :key="idx" v-for="(language, idx) in languages">
              <span
                class="item-language"
                :class="{active: language === currentLanguage}"
                @click="changeLanguage(language, close)"
              >
                {{ t(`lang.${language}`) }}
              </span>
            </div>
          </div>
        </template>
    </Popper>
  </div>
</template>

<script setup>
import {useLanguageStore} from "@/stores/language.js"
import {computed} from "vue";
import {useI18n} from "@/composables/useI18n.js";

const languageStore = useLanguageStore()
const {t} = useI18n()

const languages = computed(() => {return languageStore.getListLanguage})
const currentLanguage = computed(() => {return languageStore.getCurrentLanguage})

const changeLanguage = (language, callbackClose) => {
  languageStore.changeLanguageSystem(language)
  callbackClose()
}
</script>

<style lang="scss" scoped>
  .language-switch {
    cursor: pointer;

    .image-icon-language {
      width: 23px;
      max-width: 23px;
      min-width: 23px;
      height: 23px;
    }
  }

  .light-theme {
    --popper-theme-background-color: #ffffff;
    --popper-theme-background-color-hover: #ffffff;
    --popper-theme-text-color: #333333;
    --popper-theme-border-width: 1px;
    --popper-theme-border-style: solid;
    --popper-theme-border-color: #eeeeee;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 12px;
    --popper-theme-box-shadow: 0 6px 20px -10px rgba(0, 0, 0, 0.25);
  }

  .list-language-images {
    min-width: 80px;
    line-height: 2;
      >* {
        font-size: 13px;
      }
      span.active {
        color: forestgreen;
      }
      span.item-language:hover {
        cursor: pointer;
        font-weight: bold;
      }
  }
</style>