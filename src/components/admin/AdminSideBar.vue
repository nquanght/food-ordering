<template>
  <nav id="sidebar" :class="`sidebar js-sidebar ${isSideBarCollapsed ? 'collapsed' : ''}`">
    <div class="sidebar-content js-simplebar">
      <a class="sidebar-brand" href="index.html">
        <span class="align-middle">Hito Food</span>
      </a>

      <ul class="sidebar-nav">
        <li
          v-for="(menu, idxMenu) in menuList"
          :key="idxMenu"
          :class="menu.is_header ? 'sidebar-header' : 'sidebar-item'"
        >
          <span v-if="menu.is_header">{{ menu.name }}</span>
          <a
            v-else
            class="sidebar-link"
            href="pages-profile.html"
          >
            <i class="align-middle" data-feather="user"></i> <span class="align-middle">{{ menu.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import {onMounted, onBeforeMount} from "vue";
import {useEmitter} from "@/composables/useEmitter.js";
import {ref} from "vue";
import {adminMenu} from "@/utils/menu"

const emitter = useEmitter()

const isSideBarCollapsed = ref(false)
const menuList = ref([])

const fetchMenuList = () => {
  adminMenu.forEach((item) => {

    if (item.hasOwnProperty('group')) {
      menuList.value.push({
        is_header: true,
        name: item.group,
        url: null
      })

      if (item.hasOwnProperty('children')) {
        item.children.forEach((itemChild) => {
          menuList.value.push({
              is_header: false,
              ...itemChild
            }
          )
        })
      }
    } else {
      menuList.value.push({
        is_header: false,
        ...item
      })
    }
  })
}

onBeforeMount(() => {
  fetchMenuList()
  console.log('menuList', menuList);
  
})

onMounted(() => {
  emitter.$on('handleCollapseSideBar', () => {
    isSideBarCollapsed.value = !isSideBarCollapsed.value
  })
})
</script>

<style>

</style>