<script setup lang="ts">
import { useMenuStore } from "~/store/menu";
import { useThemeStore } from "~/store/theme";

const menuStore = useMenuStore();
const themeStore = useThemeStore();

onMounted(() => {
  if (themeStore.isDark) {
    themeStore.executeDarkModeToggle();
  }

  setTimeout(() => {
    document.body.classList.add("default-transition");
  }, 100);
});
</script>

<template>
  <div class="layout-wrapper" :class="menuStore.getMenuType()">
    <AppTopbar />
    <AppSidebar />
    <main class="layout-main-container">
      <div class="layout-main">
        <slot />
      </div>
      <AppFooter />
    </main>
    <ScrollTop />
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
</template>

<style lang="scss">
@import "~/assets/sass/app.scss";
</style>
