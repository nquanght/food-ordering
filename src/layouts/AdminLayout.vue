<template>
  <div id="admin-layout" class="container-fluid">
    <div class="row">
        <admin-sidebar/>

        <div class="col p-0">
          <admin-navigation/>

          <div class="content-wrapper">
            <div class="main-content shadow">
              <admin-bread-crumb class="p-3"/>
              <router-view v-slot="{ Component, route }">
                <div :id="getElementIdFromPageName(route.name)" class="p-3 content-page">
                  <keep-alive :include="route.meta.keepAlive ? route.name : noneKeepAliveComponent">
                    <component :is="Component" />
                  </keep-alive>
                </div>
              </router-view>
            </div>
          </div>
          
          <admin-footer/>
        </div>
    </div>

    <div class="d-flex align-items-center justify-content-center" @click="handleScrollToTop()" id="btnScrollToTopAdmin" :title="t('common.scroll_to_top')">
      <font-awesome-icon icon="fa-solid fa-circle-up" class="text-admin" size="3x" />
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted} from "vue";
import AdminSidebar from "@/components/admin/AdminSideBar.vue";
import AdminNavigation from "@/components/admin/AdminNavigation.vue"
import AdminFooter from "@/components/admin/AdminFooter.vue"
import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb.vue";
import { useConvertString } from "@/composables/common/useConvertString";
import { noneKeepAliveComponent } from "@/utils/constants";
import {useI18n} from "@/composables/useI18n.js";

const {t} = useI18n()
const convertString = useConvertString()

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
  let mybutton = document.getElementById("btnScrollToTopAdmin");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.classList.add('visible')
  } else {
    mybutton.classList.remove('visible')
  }
}
const handleScrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

const getElementIdFromPageName = (pageName) => {
  pageName.trim()

  if (pageName === '') {
    let randNumber = Math.floor(Math.random() * 101)
    return `unknown-page-${randNumber}`
  }

  return convertString.convertToDashedString(pageName)
}

</script>

<style lang="scss" scoped>
#admin-layout {
  padding-left: unset;

  #btnScrollToTopAdmin {
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

  #btnScrollToTopAdmin.visible {
    opacity: 0.8;
    visibility: visible;
  }
}

.content-wrapper {
  background-color: #f5f7fb;
  padding: 1rem 1.2rem;
  .main-content {
    background-color: white;
    border-radius: 0.5rem;
  }

  .content-page {
    min-height: 100vh;
  }
}
</style>