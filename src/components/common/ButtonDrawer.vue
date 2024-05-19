<template>
  <div
    data-bs-toggle="offcanvas"
    :data-bs-target="`#${idTarget}`"
    :aria-controls="idTarget"
    class="d-flex"
  >
    <slot name="button"/>
  </div>
  <div
    :class="`offcanvas offcanvas-${placement}`"
    tabindex="-1"
    :id="idTarget"
    :aria-labelledby="`${idTarget}Label`"
    :data-bs-scroll="bodyScrolling"
    :data-bs-backdrop="bodyBackDrop"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title fw-bold">{{ headerDrawer }}</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot name="drawerBody"/>
    </div>
  </div>
</template>

<script setup>
defineProps({
  idTarget: {
    type: String,
    required: true
  },
  placement: {
    type: String,
    validator(value, props) {
      return ['start', 'end', 'top', 'bottom'].includes(value)
    }
  },
  bodyScrolling: {
    type: Boolean,
    default: true
  },
  bodyBackDrop: {
    type: Boolean,
    default: true
  },
  headerDrawer: {
    type: String,
    default: ''
  }
})

</script>

<style scoped>
</style>