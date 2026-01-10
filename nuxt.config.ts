// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      script: [
        { src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js", defer: true },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "preconnect", href: "https://kmanda.prismic.io" },
        { rel: "preconnect", href: "https://static.cdn.prismic.io" },
        { rel: "preload", href: "/assets/creative.jpg", as: "image", fetchpriority: "high" },
        { rel: "canonical", href: "https://kumarmoorthy.com" },
      ],
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

  nitro: {
    externals: {
      inline: ['fsevents'],
    },
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // Optimize image file names
            if (/\.(jpg|jpeg|png|gif|svg|webp)$/.test(assetInfo.name)) {
              return 'assets/images/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
      },
    },
    ssr: {
    },
    optimizeDeps: {
      exclude: ['fsevents'],
    },
  },
});

