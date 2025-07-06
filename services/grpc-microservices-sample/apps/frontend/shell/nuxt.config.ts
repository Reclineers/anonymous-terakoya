// services/grpc-microservices-sample/apps/frontend/shell/nuxt.config.ts
import federation from "@originjs/vite-plugin-federation";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  vite: {
    base: "http://localhost:3100/_nuxt/",
    plugins: [
      federation({
        name: "shell",
        remotes: {
          // assetsディレクトリを含めない直接パスに変更
          userApp: {
            external: "http://localhost:3000/_nuxt/remoteEntry.js",
            format: "esm",
            from: "vite",
          },
          productApp: {
            external: "http://localhost:3001/_nuxt/remoteEntry.js",
            format: "esm",
            from: "vite",
          },
        },
        shared: [],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
    },
  },
});
