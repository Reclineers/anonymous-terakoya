// services/grpc-microservices-sample/apps/frontend/app2/nuxt.config.ts
import federation from "@originjs/vite-plugin-federation";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    buildAssetsDir: "/_nuxt/",
  },
  nitro: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    },
  },
  vite: {
    server: {},
    base: "http://localhost:3001/_nuxt/",
    plugins: [
      federation({
        name: "productApp",
        filename: "remoteEntry.js",
        exposes: {
          "./ProductCatalog": "./components/ProductCatalog.vue",
        },
        shared: [],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  },
});
