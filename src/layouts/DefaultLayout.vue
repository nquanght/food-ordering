<template>
  <div id="default-layout">
    <Navigation/>
    <div class="main-content">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="route.meta.keepAlive ? route.name : noneKeepAliveComponent">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <Footer/>
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import Footer from "@/components/Footer.vue";
import { noneKeepAliveComponent } from "@/utils/constants";
</script>

<style>
.main-content  {
  min-height: 100vh
}

</style>