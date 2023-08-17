// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js' }],
    },
  },
  css: [
    "@/layouts/global.css",
  ],

  modules: ["@nuxtjs/prismic"],

  prismic: {
    endpoint: "kmanda",
  },
})