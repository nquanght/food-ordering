<template>
  <div id="default-layout">
    <Navigation/>
    <div class="main-content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import Footer from "@/components/Footer.vue";
</script>

<style>
.main-content  {
  min-height: 100vh
}

</style>