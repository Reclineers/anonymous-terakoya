<!-- components/DownloadButton.vue -->
<template>
  <div>
    <button
      @click="handleDownload"
      :disabled="isProcessing"
      class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
    >
      {{ buttonText }}
    </button>

    <div v-if="activeProcesses.length > 0" class="mt-2">
      <div
        v-for="process in activeProcesses"
        :key="process.id"
        class="text-sm text-gray-600"
      >
        Processing: {{ process.progress }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDownloadStore } from "~/composables/store/download";

const downloadStore = useDownloadStore();

const activeProcesses = computed(() => downloadStore.activeProcesses);
const isProcessing = computed(() => activeProcesses.value.length > 0);
const buttonText = computed(() =>
  isProcessing.value ? "Processing..." : "Generate Report"
);

const handleDownload = async () => {
  try {
    const data = generateSampleData();
    await downloadStore.startProcess(data);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

const generateSampleData = () => {
  return Array.from(
    { length: 1000 },
    (_, i) =>
      `Line ${
        i + 1
      }: This is a sample text line with some random data ${Math.random()}`
  );
};
</script>
