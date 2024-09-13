// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "@bootstrap-vue-next/nuxt",
    "@primevue/nuxt-module",
  ],
  css: ["~/assets/sass/tailwind.css", "~/assets/sass/styles.scss"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".app-dark",
        },
      },
    },
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
});
