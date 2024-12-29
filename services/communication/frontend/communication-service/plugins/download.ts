import { useDownloadStore } from "~/composables/store/download";

// plugins/download.ts
export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== "undefined") {
    const downloadStore = useDownloadStore();

    // クライアントサイドでのみ実行
    nextTick(() => {
      downloadStore.restoreProcesses();
    });

    // クリーンアップ処理の登録
    window.addEventListener("beforeunload", () => {
      downloadStore.cleanup();
    });
  }
});
