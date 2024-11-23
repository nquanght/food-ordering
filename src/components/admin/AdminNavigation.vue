<template>
  <nav class="navbar navbar-bg-shadow bg-white d-flex justify-content-between px-3 py-3 position-sticky top-0">
    <div class="sidebar-toggle" @click="handleCollapseSideBar">
      <font-awesome-icon icon="fa-solid fa-bars" size="lg"/>
    </div>

    <div class="d-flex align-items-center navbar-right">
      <language-switch/>
      <a href="#" class="text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img
          src="https://avatars.githubusercontent.com/u/65084795?v=4"
          alt="hugenerd"
          class="rounded-circle"
          width="25"
          height="25"
        >
        <span class="d-none d-sm-inline mx-1 text-dark">Hello, Quang</span>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import LanguageSwitch from "../LanguageSwitch.vue";
import {useEmitter} from "@/composables/useEmitter.js";

const emitter = useEmitter()

const handleCollapseSideBar = () => {
  emitter.$emit('handleCollapseSideBar', () => {})
}
</script>

<style lang="scss" scoped>
nav {
  z-index: 2;
  &.navbar-bg-shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
}

.dropdown-menu {
  left: unset;
  right: 10px;
}

.sidebar-toggle:hover {
  cursor: pointer;
}

.navbar-right {
  :not(:last-child) {
    margin-right: 5px;
  }
}
}
</style>