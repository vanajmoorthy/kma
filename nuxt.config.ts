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
    apiOptions: {
      routes: [
        // Resolves Page documents to URLs like "/about" and "/blog"
        {
          type: 'page',
          path: '/:uid',
        },
      ],
    },
  },
})