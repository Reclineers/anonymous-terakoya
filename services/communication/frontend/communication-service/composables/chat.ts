import { useChatStore } from "./store/chatStore";

export const useChat = () => {
  const chatStore = useChatStore();

  /**
   * 入力されたメッセージ
   */
  const message = ref<string>("");

  /**
   * 送受信されたメッセージの一覧
   */
  const messages = computed(() => chatStore.messages);

  /**
   * メッセージの送信日時を表示用のテキストに変換する
   * @param timestamp 送信日時
   * @returns 表示用のテキスト
   */
  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleDateString();
  };

  /**
   * 入力されたメッセージを消去する
   */
  const clearInputMessage = () => {
    message.value = "";
  };

  /**
   * 入力されたメッセージを更新する
   * @param value メッセージの内容
   */
  const updateInputMessage = (value: string) => {
    message.value = value;
  };

  /**
   * メッセージを送信する
   * @param content メッセージの内容
   */
  const sendMessage = (content: string) => {
    chatStore.sendMessage(content);
  };

  return {
    messages,
    message,
    sendMessage,
    formatMessageTime,
    clearInputMessage,
    updateInputMessage,
  };
};
