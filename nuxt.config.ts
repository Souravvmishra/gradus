// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  ssr: true,
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: false },

  modules: [
    "@nuxt/content",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "nuxt-gtag",
    "@nuxt/image",
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  content: {
    documentDriven: true,
    experimental: {
      clientDb: true,
      search: {
        fields: ["title", "description", "tags"],
      },
    },
    highlight: {
      theme: "light-plus",
    },
    markdown: {
      anchorLinks: {
        depth: 0,
      },
      // tags: {
      //   p: 'MyCustomParagraph'
      // }
    },
  },
  extends: "@nuxt-themes/typography",
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    // firebase: {
    //   gen: 2
    // }
  },
  gtag: {
    id: process.env.GTAG,
  },
});
