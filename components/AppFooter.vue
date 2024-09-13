<script setup lang="ts">
import { useThemeStore } from "~/store/theme";

const themeStore = useThemeStore();

const footerImage = () => {
  return themeStore.isDark ? "/images/logo-white.svg" : "/images/logo-dark.svg";
};
</script>

<template>
  <div class="layout-footer">
    <img alt="Logo" :src="footerImage()" class="mr-2 h-8" />
    by
    <a
      href="https://www.hotray.cn"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary font-bold hover:underline"
      >HotRay</a
    >
  </div>
</template>
