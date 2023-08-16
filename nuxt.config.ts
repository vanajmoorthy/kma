// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
      "@/layouts/global.css",
  ],

  modules: ["@nuxtjs/prismic"],

  prismic: {
    endpoint: "kmanda",
  },
})