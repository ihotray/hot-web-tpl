// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    [
      "@nuxt-modules/compression",
      {
        disable: false,
        threshold: 1025,
        filter: /\.(js|mjs|css|html|svg|eot|woff|ttf)$/i,
        algorithm: "gzip",
        deleteOriginFile: true,
      },
    ],
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "@bootstrap-vue-next/nuxt",
    "@primevue/nuxt-module",
  ],
  css: ["~/assets/sass/styles.scss"],
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
