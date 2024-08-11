<template>
  <div id="default-layout">
    <Navigation/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import Footer from "@/components/Footer.vue";
</script>

<style scoped>


</style>