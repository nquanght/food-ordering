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

    <div class="d-flex align-items-center justify-content-center" @click="handleScrollToTop()" id="btnScrollToTop" :title="t('common.scroll_to_top')">
      <font-awesome-icon icon="fa-solid fa-circle-up" class="text-admin" size="3x" />
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted} from "vue";
import Navigation from '../components/Navigation.vue'
import Footer from "@/components/Footer.vue";
import { noneKeepAliveComponent } from "@/utils/constants";
import {useI18n} from "@/composables/useI18n.js";

const {t} = useI18n()
onMounted(() => {
  addScrollingEvents()
})

onUnmounted(() => {
  removeScrollingEvents()
})
const addScrollingEvents = () => {
  window.onscroll = () => {
    eventScrollToTop()
  }
}

const removeScrollingEvents = () => {
  window.removeEventListener('scroll', () => {
    eventScrollToTop()
  })
}
const eventScrollToTop = () => {
  let mybutton = document.getElementById("btnScrollToTop");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.classList.add('visible')
  } else {
    mybutton.classList.remove('visible')
  }
}
const handleScrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

</script>

<style lang="scss">
#default-layout {
  .main-content  {
    min-height: 100vh
  }

  #btnScrollToTop {
    opacity: 0;
    visibility: hidden;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 10;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    border-radius: 25px;
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  }

  #btnScrollToTop.visible {
    opacity: 0.7;
    visibility: visible;
  }
}

</style>