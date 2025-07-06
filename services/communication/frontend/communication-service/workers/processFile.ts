// workers/processFile.ts
self.onmessage = async (e) => {
  const { data } = e.data;

  try {
    // データ処理のシミュレーション
    let processedContent = "";
    const total = data.length;

    for (let i = 0; i < total; i++) {
      // 各行を処理
      processedContent += data[i] + "\n";

      // 進捗を報告（10%単位）
      const progress = Math.round(((i + 1) / total) * 100);
      self.postMessage({ type: "progress", payload: progress });

      // 処理時間をシミュレート
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    self.postMessage({ type: "complete", payload: processedContent });
  } catch (error) {
    self.postMessage({ type: "error", payload: error.message });
  }
};
