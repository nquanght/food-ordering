<template>
  <div class="container-fluid admin-layout">
    <div class="row">
        <admin-sidebar/>

        <div class="col p-0">
          <admin-navigation/>

          <div class="content-wrapper">
            <router-view class="p-3 main-content"/>
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