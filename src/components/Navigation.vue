<template>
  <header id="header">
    <div class="d-flex container-md justify-content-between align-items-center">
      <div class="col-md-1 col-sm-1">
        <img src="/images/logo.png" alt="Logo" style="height: 65px; width: auto" loading="lazy"/>
      </div>
      <div class="col-md-7 d-none d-md-block">
        <ul class="nav">
          <li
            class="nav-item"
            v-for="(menu, key) in listMenu"
            :key="key"
          >
            <router-link
              :to="menu.url"
              class="nav-link"
            >
              {{ t(menu.name ) }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-4 d-flex align-items-center justify-content-end">
        <a class="btn" href="/admin">View admin site</a>
        <div class="pe-3">
          <button class="btn btn-warning btn-sm shadow-sm" style="border-radius: 5px">
            <font-awesome-icon icon="fa-solid fa-user" /> <span class="ps-1">{{ t('auth.login') }}</span>
          </button>
        </div>
        <language-switch class="pe-md-0 pe-3"/>
        <div class="col-md-4 d-flex d-md-none hidden-navbar">
          <button-drawer
            :id-target="idHiddenTarget"
            :header-drawer="t('navigation.sidebar_header')"
            placement="end"
          >
            <template #button>
              <font-awesome-icon
                icon="fa-solid fa-bars" size="xl"
              />
            </template>
            <template #drawerBody>
              <ul class="nav d-block">
                <li
                    class="nav-item"
                    v-for="(menu, key) in listMenu"
                    :key="key"
                >
                  <a :href="menu.url" :class="`nav-link ${isActiveMenu(menu.url) ? 'router-link-active' : ''}`">{{ t(menu.name) }}</a>
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
import {userMenu} from "@/utils/menu";
import LanguageSwitch from "./LanguageSwitch.vue"
import ButtonDrawer from "@/components/common/ButtonDrawer.vue";
import {useI18n} from "@/composables/useI18n.js";
import { watch, onMounted, ref } from 'vue';
import {useI18n as vuei18n} from 'vue-i18n'
import {useEmitter} from "@/composables/useEmitter.js";
import { eventName } from '@/utils/constants';

const emitter = useEmitter()
const { t: i18n } = vuei18n() 
const listMenu = userMenu
const route = useRoute()
const {t} = useI18n()
const idHiddenTarget = Math.random().toString(36).substring(2) + '-offCanvas'
const currentTitle = ref('')


function isActiveMenu (menuPath) {
  return route.path.replace('/', '') === menuPath
}

const changeTitle = (title) => {
  document.title = title ? i18n(title) : 'Ordering'
}

watch(
  () => route,
  (newRoute, oldRoute) => {
    currentTitle.value = newRoute.meta.title
    changeTitle(currentTitle.value)
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  emitter.$on(eventName.changeTitle, () => {
    changeTitle(currentTitle.value)
  })
})
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