<script lang="ts" setup>
import { useThemeStore } from "~/store/theme";

const themeStore = useThemeStore();

onMounted(() => {
  if (themeStore.isDark) {
    themeStore.executeDarkModeToggle();
  }
});
</script>

<template>
  <div class="layout-empty">
    <slot />
  </div>
</template>
