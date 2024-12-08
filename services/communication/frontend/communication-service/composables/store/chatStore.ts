import { defineStore } from "pinia";
import type { Message } from "@/types/chat";

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    /**
     * メッセージを追加する
     * @param message 追加するメッセージ
     */
    addMessage(message: Message) {
      this.messages.push(message);
    },

    /**
     * メッセージを送信する
     * @param content 送信する内容
     */
    sendMessage(content: string) {
      const message: Message = {
        id: Date.now().toString(),
        content,
        userId: "user1",
        timestamp: new Date(),
        isOwn: true,
      };
      this.addMessage(message);
    },
  },
});
