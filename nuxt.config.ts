// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      script: [
        { src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js" },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "canonical", href: "https://kumarmoorthy.com" }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
        { name: "author", content: "Kumar Moorthy & Associates" },
        {
          name: "keywords",
          content:
            "Kumar Moorthy & Associates, Kumar Moorthy and Associates, architects Delhi, interior designers Delhi, architecture firm Delhi, award winning architects, residential architects, commercial architects, KM&A, architectural design India",
        },
      ],
    },
  },
  css: ["@/layouts/global.css"],

  modules: ["@nuxtjs/prismic"],

  runtimeConfig: {
    public: {
      siteUrl: "https://kumarmoorthy.com",
      siteName: "Kumar Moorthy & Associates",
    },
  },

  prismic: {
    endpoint: "kmanda",
    apiOptions: {
      routes: [
        // Resolves Page documents to URLs like "/about" and "/blog"
        {
          type: "page",
          path: "/:uid",
        },
      ],
    },
  },
});

