<template>
  <header id="header">
    <div class="d-flex container-md justify-content-between align-items-center">
      <div class="col-md-1 col-sm-1">
        <img src="/images/logo.png" alt="Logo" style="height: 65px; width: auto"/>
      </div>
      <div class="col-md-7 d-none d-md-block">
        <ul class="nav">
          <li
            class="nav-item"
            v-for="menu in listMenu"
          >
            <router-link
              :to="menu.path"
              class="nav-link"
            >
              {{ menu.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-4 d-flex align-items-center justify-content-end">
        <div class="pe-3">
          <button class="btn btn-warning btn-sm shadow-sm" style="border-radius: 5px">
            <font-awesome-icon icon="fa-solid fa-user" /> <span class="ps-1">Đăng nhập/Đăng ký</span>
          </button>
        </div>
        <language-switch class="pe-md-0 pe-3"/>
        <div class="col-md-4 d-flex d-md-none hidden-navbar">
          <button-drawer
            :id-target="idHiddenTarget"
            header-drawer="Navigator"
            placement="end"
          >
            <template #button>
              <font-awesome-icon
                icon="fa-solid fa-bars" size="xl"
              />
            </template>
            <template #drawerBody>
              <div>

              </div>
              <ul class="nav d-block">
                <li
                    class="nav-item"
                    v-for="menu in listMenu"
                >
                  <a :href="menu.path" :class="`nav-link ${isActiveMenu(menu.path) ? 'router-link-active' : ''}`">{{ menu.name }}</a>
                </li>
              </ul>
            </template>
          </button-drawer>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import routes from "@/router/routes.js";
import LanguageSwitch from "./LanguageSwitch.vue"
import ButtonDrawer from "@/components/common/ButtonDrawer.vue";

const listMenu = routes[0].children
const idHiddenTarget = Math.random().toString(36).substring(2) + '-offCanvas'

const route = useRoute()

function isActiveMenu (menuPath) {
  return route.path === menuPath
}
</script>


<style lang="scss" scoped>
$font-weight-bold: 500;
  #header {
    font-size: 14px;
    margin-bottom: 20px;
    box-shadow: 0 1px 6px #dcdcdc;

    .nav .nav-link {
      color: black;
      font-weight: $font-weight-bold !important;
    }

    .router-link-active {
      color: forestgreen !important;
    }

    .hidden-navbar > a, svg {
      cursor: pointer;
    }
  }
</style>