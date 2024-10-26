<template>
  <Modal page-title="Đánh giá về nhà hàng" width="40%">
    <template #content>
      <div class="fs-6 comment-merchant">
        <div v-for="n in 20">rate</div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Modal from "@/components/common/Modal.vue";

</script>

<style scoped lang="scss">
.rate-merchant {
  >div {
    >span {
      font-size: 1.1rem;
    }
  }
}
</style>