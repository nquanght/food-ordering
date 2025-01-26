<template>
  <div class="vue-modal">
    <div class="vue-modal-panel" :style="{maxWidth: adjustWidth}">
      <div class="header-modal align-modal-default">
        <span class="fw-bold fs-4">{{ pageTitle }}</span>
        <div class="btn-close-form cursor-pointer" @click="close">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" size="xl" />
        </div>
      </div>

      <div class="content-modal align-modal-content">
        <div
          v-if="loadingForm"
          class="placeholder-glow w-100 h-100 loading-skeleton-wrapper wrapper-horizontal mb-4"
        >
          <div
            v-for="(number, idx) in maxColumnLoading"
            :key="idx"
            :class="`placeholder d-block mt-2 col-${getRandomFlexColumn()}`"/>
        </div>
        <slot v-else name="content"/>
      </div>

      <div v-if="!loadingForm" class="footer-modal align-modal-default">
        <div v-if="!hideListButton" class="list-button-form">
          <slot name="button-form"/>
          <button
            v-if="!hideButtonClose"
            type="button"
            class="btn-general"
            @click="close"
          >
            <span>{{ t('button.close') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEmitter } from "@/composables/useEmitter.js";
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from "@/composables/useI18n.js";
import { eventName } from "@/utils/constants";

const {t} = useI18n()

const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Modal Header'
  },
  width: {
    type: String,
    default: '60%'
  },
  hideListButton: {
    type: Boolean,
    default: false
  },
  hideButtonClose: {
    type: Boolean,
    default: false
  },
  loadingForm: {
    type: Boolean,
    default: false
  },
  maxColumnLoading: {
    type: Number,
    default: 6
  }
})

const emitter = useEmitter()

const close = () => {
  emitter.$emit(eventName.close)
}

const screenWidth = ref(window.innerWidth)

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

const closeFormByKeyEsc = (event) => {
  if (event.isTrusted && event.key == 'Escape') {
    close()
  } 
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
  // window.addEventListener('keydown', (event) => closeFormByKeyEsc(event))
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
  // window.removeEventListener('keydown', (event) => closeFormByKeyEsc(event))
})

const adjustWidth = computed(() => {
  return screenWidth.value < 576 ? '90%' : (screenWidth.value < 768 ? '80%' : props.width)
})

const getRandomFlexColumn = (maxCols) => {
  if (!maxCols) {
    maxCols = 12
  }

  let randomNumber = Math.floor(Math.random() * 10) + 1

  if (randomNumber > maxCols) {
    randomNumber = maxCols
  }
  return randomNumber
}

</script>

<style scoped lang="scss">
.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  overflow-x: hidden;
  overflow-y: auto;
  align-content: center;
  z-index: 99
}

.vue-modal-panel {
  position: relative;
  min-height: 20%;
  max-height: 90%;
  background-color: white;
  margin: 2rem auto;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
  border-radius: .4rem;
  overflow-y: auto;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.header-modal {
  position: sticky;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.content-modal {
  z-index: 1
}

.footer-modal {
  position: sticky;
  bottom: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.align-modal-default {
  padding: 1rem 1rem;
}

.align-modal-content {
  padding: 0 1.5rem;
}

.btn-close-form {
  transition: transform 150ms ease-out;

  &:hover {
    transform: scale(1.2);
  }
}
</style>