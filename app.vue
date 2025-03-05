<script setup lang="ts">
import { useThemeStore } from "./store/theme";

const themeStore = useThemeStore();

const isDesktop = () => {
  return window.innerWidth >= 768;
};

const handleWindowResize = () => {
  if (themeStore.isDesktop === isDesktop()) return;
  themeStore.isDesktop = isDesktop();
};

onMounted(() => {
  window.addEventListener("resize", handleWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleWindowResize);
});
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
