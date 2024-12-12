<script setup lang="ts">
import { useThemeStore } from "~/store/theme";
import { useMenuStore } from "~/store/menu";

const themeStore = useThemeStore();

const menuStore = useMenuStore();

const topbarImage = () => {
  return themeStore.isDark ? "/images/logo-white.svg" : "/images/logo-dark.svg";
};

const isDesktop = () => {
  return window.innerWidth >= 768;
};

const onMenuToggle = (e: MouseEvent) => {
  if (isDesktop()) {
    menuStore.changeSideMenuStatus({
      step: menuStore.getMenuClickCount() + 1,
      classNames: menuStore.getMenuType(),
      selectedMenuHasSubItems: menuStore.getSelectedMenuHasSubItems(),
    });
  } else {
    menuStore.changeSideMenuForMobile(menuStore.getMenuType());
  }

  e.preventDefault();
};
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <NuxtLink to="/" class="layout-topbar-logo ml-6">
        <img alt="Logo" :src="topbarImage()" class="h-12" />
        <span>Smart</span>
      </NuxtLink>
    </div>
    <div class="layout-menu-button">
      <button
        type="button"
        class="layout-topbar-action"
        @click.prevent.stop="onMenuToggle"
      >
        <i class="pi pi-bars"></i>
      </button>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button
          type="button"
          class="layout-topbar-action layout-topbar-action-highlight"
          @click="themeStore.toggleDarkMode"
        >
          <i
            :class="[
              'pi',
              { 'pi-moon': themeStore.isDark, 'pi-sun': !themeStore.isDark },
            ]"
          ></i>
        </button>
        <div class="relative">
          <button
            type="button"
            class="layout-topbar-action layout-topbar-action-highlight"
          >
            <i class="pi pi-palette"></i>
          </button>
        </div>
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterToClass: 'animate-scalein',
          leaveFromClass: 'animate-scalein',
          leaveToClass: 'hidden',
          hideOnOutsideClick: true,
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-calendar"></i>
            <span>Calendar</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-inbox"></i>
            <span>Messages</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
