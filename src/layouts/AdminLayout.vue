<template>
  <div id="admin-layout">
    <div class="wrapper">
      <AdminSideBar/>

      <div class="main">
        <AdminNavigation/>

        <div class="content">
          <router-view/>
        </div>

        <AdminFooter/>
      </div>
	  </div>
  </div>
</template>

<script setup>
import AdminSideBar from "@/components/admin/AdminSideBar.vue";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";
import AdminFooter from "@/components/admin/AdminFooter.vue";
</script>

<style lang="scss">
@import '@/assets/admin/css/app.css';
</style>