<template>
  <div class="container-fluid admin-layout">
    <div class="row">
        <admin-sidebar/>

        <div class="col p-0">
          <admin-navigation/>

          <div class="content-wrapper">
            <admin-bread-crumb class="p-3"/>
            <router-view v-slot="{ Component, route }">
              <div :id="getElementIdFromPageName(route.name)" class="p-3 main-content">
                <keep-alive :include="route.meta.keepAlive ? route.name : noneKeepAliveComponent">
                  <component :is="Component" />
                </keep-alive>
              </div>
            </router-view>
          </div>
          
          <admin-footer/>
        </div>
    </div>
</div>
</template>

<script setup>
import AdminSidebar from "@/components/admin/AdminSideBar.vue";
import AdminNavigation from "@/components/admin/AdminNavigation.vue"
import AdminFooter from "@/components/admin/AdminFooter.vue"
import AdminBreadCrumb from "@/components/admin/AdminBreadCrumb.vue";
import { useConvertString } from "@/composables/common/useConvertString";
import { noneKeepAliveComponent } from "@/utils/constants";

const convertString = useConvertString()

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
.admin-layout {
  padding-left: unset;
}

.content-wrapper {
  background: #f5f7fb;

  .main-content {
    height: 100vh;
  }
}
</style>