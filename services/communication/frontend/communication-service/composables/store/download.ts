// stores/download.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface DownloadProcess {
  id: string;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  data: string[];
  currentIndex: number;
}

export const useDownloadStore = defineStore("download", () => {
  const processes = ref<Map<string, DownloadProcess>>(new Map());
  const processIntervals = ref<Map<string, number>>(new Map());

  const activeProcesses = computed(() => {
    return Array.from(processes.value.values()).filter((p) => p.isProcessing);
  });

  // ユーティリティ関数
  const isClient = () => typeof window !== "undefined";

  const saveProcesses = () => {
    if (!isClient()) return;
    const processesData = Array.from(processes.value.entries());
    window.localStorage.setItem(
      "downloadProcesses",
      JSON.stringify(processesData)
    );
  };

  const restoreProcesses = () => {
    if (!isClient()) return;
    try {
      const saved = window.localStorage.getItem("downloadProcesses");
      if (saved) {
        const processesData = JSON.parse(saved);
        processes.value = new Map(processesData);

        processes.value.forEach((process, id) => {
          if (process.isProcessing) {
            continueProcess(id);
          }
        });
      }
    } catch (error) {
      console.error("Failed to restore processes:", error);
    }
  };

  const startProcess = async (data: string[]) => {
    if (!isClient()) return;

    const processId = crypto.randomUUID();

    processes.value.set(processId, {
      id: processId,
      isProcessing: true,
      progress: 0,
      error: null,
      data,
      currentIndex: 0,
    });

    saveProcesses();
    continueProcess(processId);

    return processId;
  };

  const continueProcess = (processId: string) => {
    if (!isClient()) return;

    const process = processes.value.get(processId);
    if (!process || !process.isProcessing) return;

    const interval = window.setInterval(() => {
      processNextBatch(processId);
    }, 100);

    processIntervals.value.set(processId, interval);
  };

  const processNextBatch = (processId: string) => {
    const process = processes.value.get(processId);
    if (!process || !process.isProcessing) return;

    const batchSize = 10;
    let content = "";

    for (
      let i = 0;
      i < batchSize && process.currentIndex < process.data.length;
      i++
    ) {
      content += process.data[process.currentIndex] + "\n";
      process.currentIndex++;
    }

    const progress = Math.round(
      (process.currentIndex / process.data.length) * 100
    );
    updateProcess(processId, { progress });

    if (process.currentIndex >= process.data.length) {
      completeProcess(processId, content);
    }

    saveProcesses();
  };

  const updateProcess = (
    processId: string,
    updates: Partial<DownloadProcess>
  ) => {
    const process = processes.value.get(processId);
    if (process) {
      processes.value.set(processId, { ...process, ...updates });
    }
  };

  const completeProcess = (processId: string, content: string) => {
    if (!isClient()) return;

    const interval = processIntervals.value.get(processId);
    if (interval) {
      window.clearInterval(interval);
      processIntervals.value.delete(processId);
    }

    updateProcess(processId, {
      isProcessing: false,
      progress: 100,
    });

    downloadTextFile(content);
    saveProcesses();
  };

  const downloadTextFile = (content: string) => {
    if (!isClient()) return;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `report_${new Date().toISOString()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const cleanup = () => {
    if (!isClient()) return;

    processIntervals.value.forEach((interval) =>
      window.clearInterval(interval)
    );
    processIntervals.value.clear();
  };

  return {
    processes,
    activeProcesses,
    startProcess,
    restoreProcesses,
    cleanup,
  };
});
