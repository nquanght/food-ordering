<template>
  <div id="admin-sidebar" :class="`bg-dark min-vh-100 ${isSideBarToggled ? 'sidebar-toggled' : ''}`">
    <div class="position-sticky top-0">
      <div class="logo-area text-white">
        <div class="logo-icon"><font-awesome-icon :icon="iconHeaderSideBar"/></div>
        <div class="logo-text fw-bold user-select-none">FOOD ORDERING</div>
      </div>
      <div class="text-white">
        <div class="item-menu" v-for="(menu, menuIdx) in menuList" :key="menuIdx">
          <div
            :class="`cursor-pointer item-sidebar position-relative ${activeMenu(menu) ? 'active' : ''}`"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapseMenu${menuIdx}`"
            aria-expanded="false"
            :aria-controls="`collapseMenu${menuIdx}`"
            @click="selectMenu(menu)"
          >
            <div class="item-menu-text-icon">
              <div class="icon">
                <font-awesome-icon :icon="menu.icon" style="width: 24px; height: 24px;"/>
              </div>
              <div class="text fw-light"><span>{{ t(menu.name) }}</span></div>
              <span class="icon-caret-right" v-if="menu.hasOwnProperty('group')">
                <font-awesome-icon :icon="iconCaretRight" />
              </span>
              <span class="icon-caret-down" v-if="menu.hasOwnProperty('group')">
                <font-awesome-icon :icon="iconCaretDown" />
              </span>
            </div>
            
            <div v-if="menu.hasOwnProperty('group')">
              <ul class="dropdown-menu dropdown-menu-dark">
                <li class="dropdown-header user-select-none">
                  <span class="text-white"><span class="fw-bold">{{ t(menu.name) }}</span></span>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li
                  :class="`dropdown-item cursor-pointer ${activeMenu(childMenu) ? 'active' : ''}`"
                  v-for="(childMenu, idxChild) in menu.group"
                  :key="idxChild"
                  @click="selectMenu(childMenu)"
                  style="z-index: 99;"
                >
                  <span>{{ t(childMenu.name) }}</span>
                </li>
              </ul>
            </div>
            <div v-else>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li class="dropdown-header">
                  <span class="fw-bold text-white">{{ t(menu.name) }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="collapse-auto-scale"
            v-if="menu.hasOwnProperty('group')"
          >
            <div class="collapse" :id="`collapseMenu${menuIdx}`">
              <div
                :class="`collapse-wrapper cursor-pointer ${activeMenu(childMenu) ? 'active' : ''}`"
                v-for="(childMenu, idxChild) in menu.group"
                :key="idxChild"
                @click="selectMenu(childMenu)"
              >
                <div class="collapse-item-menu">{{ t(childMenu.name) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Temp button -->
        <a class="item-menu text-decoration-none text-white btn" href="/">View user site</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, watch, onUnmounted} from "vue";
import {useEmitter} from "@/composables/useEmitter.js";
import {ref} from "vue";
import {adminMenu} from "@/utils/menu"
import {useI18n} from "@/composables/useI18n"
import {useRoute, useRouter} from 'vue-router'
import {useI18n as vuei18n} from 'vue-i18n'
import { eventName } from "@/utils/constants";

const emitter = useEmitter()
const {t} = useI18n()
const { t: i18n } = vuei18n() 
const router = useRouter()
const route = useRoute()

const isSideBarToggled = ref(false)
const menuList = ref(adminMenu)
const iconHeaderSideBar = ref('fa-solid fa-burger')
const iconCaretDown = ref('fa-solid fa-caret-down')
const iconCaretRight = ref('fa-solid fa-caret-right')
const currentRoute = ref('')

const handleResizeScreen = () => {
  let widthScreen = window.innerWidth

  let adminSidebar = document.getElementById('admin-sidebar')
  if (widthScreen <= 540) {
    adminSidebar.style.display = 'none'
  } else {
    adminSidebar.style.display = 'block'
    if (widthScreen <= 960) {
      isSideBarToggled.value = true
    } else {
      isSideBarToggled.value = false
    }
  }
}

const activeMenu = (menu) => {
  return !!(menu && menu.hasOwnProperty('url') && (menu.url === currentRoute.value))
}

const selectMenu = (menu) => {
  if (menu && menu.hasOwnProperty('url')) {
    let url = menu.url

    currentRoute.value = url
    router.push({path: url})
  }
  return
}

const changeTitle = (routeMatched) => {
  document.title = routeMatched.meta.title ? 'Admin - ' + i18n(routeMatched.meta.title) : routeMatched.name
}

onMounted(() => {
  emitter.$on(eventName.handleCollapseSideBar, () => {
    let widthScreen = window.innerWidth
    let adminSidebar = document.getElementById('admin-sidebar')
    isSideBarToggled.value = !isSideBarToggled.value

    if (widthScreen <= 540) {
      adminSidebar.style.display = isSideBarToggled.value ? 'block' : 'none'
    }
  })

  currentRoute.value = route.path.replace('/admin/', '')
  emitter.$on(eventName.changeTitle, () => {
    changeTitle(route)
  })
  handleResizeScreen()
  window.addEventListener('resize', handleResizeScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResizeScreen)
})

watch(currentRoute, (newVal) => {
  let routes = router.getRoutes()
  let routeMatched = routes.find(route => route.path === '/admin/' + newVal)
  
  if (routeMatched) {
    changeTitle(routeMatched)
  }
})
</script>

<style lang="scss" scoped>
#admin-sidebar {
  width: 240px;
  transition: width .1s ease;
  padding-right: unset;

  .logo-area {
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-text {
      font-size: 1.1rem;
      padding-left: .5rem;
    }
    .logo-icon > svg {
      font-size: 1.5rem;
    }
    padding: 1.2rem 0 2rem 0;
  }

  .item-menu {
    .item-menu-text-icon {
      display: flex;
      align-items: center;
      padding-left: 1rem;
      height: 3.5rem;
      opacity: 0.7;
      .icon {
        padding-right: 1rem;
      }
    }
    .collapse-wrapper {
      .collapse-item-menu {
        padding-left: 3.9rem;
        height: 3rem;
        align-content: center;
        opacity: 0.7;
      }
    }

    .item-sidebar[aria-expanded="true"] {
      .icon-caret-down {
        position: absolute;
        right: 1.5rem;
      }
      .icon-caret-right {
        display: none;
      }
    }
    .item-sidebar[aria-expanded="false"] {
      .icon-caret-right {
        position: absolute;
        right: 1.5rem;
      }
      .icon-caret-down {
        display: none;
      }
    }
  }
}

/* For tablet resolution */
 #admin-sidebar.sidebar-toggled {
  width: 70px;
  .logo-area {
    padding: .5rem 0 1.5rem 0;
    display: flex;
    justify-content: center;
    .logo-text {
      display: none;
    }
    .logo-icon > svg {
      font-size: 2.5rem;
    }
  }
  .item-menu {
    .item-menu-text-icon {
      opacity: 0.7;
      display: flex;
      justify-content: center;
      padding-left: unset;
      .text {
        display: none;
      }
      .icon {
        padding-right: unset;
      }
      .icon-caret {
        display: none;
      }
    }
  }
  .item-menu:hover .dropdown-menu {
    left: 58px;
    top: 0;
    display: block;
  }
  .collapse-auto-scale {
    display: none;
  }
}

#admin-sidebar {
  .item-sidebar:hover {
    .item-menu-text-icon {
      opacity: 1;
    }
  }
  .collapse-wrapper:hover {
    .collapse-item-menu {
      opacity: 1;
    }
  }
  .item-menu {
    &:has(.item-sidebar.active), &:has(.collapse-wrapper.active), &:has(.dropdown-item.active) {
      .item-sidebar {
        background-color: cadetblue;
      }
      .item-menu-text-icon {
        opacity: 1;
        span {
          font-weight: 700;
        }
      }
    }
    .collapse-auto-scale {
      .collapse-wrapper.active .collapse-item-menu {
        opacity: 1;
        font-weight: 700;
      }
    }
  }

  .dropdown-menu {
    .dropdown-item.active, .dropdown-item:active {
      background-color: cadetblue;
    }
  }

}
#admin-sidebar {
  z-index: 3;
}
</style>