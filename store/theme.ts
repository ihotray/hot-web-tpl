import { defineStore } from "pinia";

export const useThemeStore = defineStore(
  "theme",
  () => {
    const isDark = ref(false);
    const executeDarkModeToggle = () => {
      document.documentElement.classList.toggle("app-dark");
    };

    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      if (!document.startViewTransition) {
        executeDarkModeToggle();
        return;
      }
      document.startViewTransition(() => executeDarkModeToggle());
    };

    return { isDark, executeDarkModeToggle, toggleDarkMode };
  },
  {
    persist: true,
  }
);
