// services/grpc-microservices-sample/apps/frontend/app1/nuxt.config.ts
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
    base: "http://localhost:3000/_nuxt/",
    plugins: [
      federation({
        name: "userApp",
        filename: "remoteEntry.js",
        exposes: {
          "./UserManagement": "./components/UserManagement.vue",
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
