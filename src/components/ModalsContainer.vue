<template>
    <Teleport to="body">
      <TransitionGroup name="list" tag="div">
        <component
          :is="modal.component"
          v-for="(modal, idx) in listModal"
          :key="idx"
        />
      </TransitionGroup>
    </Teleport>
</template>

<script setup>
import {computed, onMounted} from 'vue'
import {useModalStore} from "@/stores/modal.js";
import {useEmitter} from "@/composables/useEmitter.js";

const modalStore = useModalStore()
const listModal = computed(() => {
  return modalStore.getListModal
})

const emitter = useEmitter()

onMounted(() => {
  emitter.$on('close', () => {
    modalStore.closeModal()
  })
})

</script>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>