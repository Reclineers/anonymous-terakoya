<template>
  <div class="chat">
    <header class="chat__header">
      <h1 class="chat__title">Chat</h1>
    </header>

    <main class="chat__main">
      <MessageList :messages="messages" />
    </main>

    <footer class="chat__footer">
      <MessageInput @send="handleSend" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useChat } from "@/composables/chat";
import MessageList from "~/components/organisms/MessageList.vue";
import MessageInput from "~/components/molecules/MessageInput.vue";

const { sendMessage, messages } = useChat();

/**
 * 送信ボタンを押されたらメッセージを送信する
 * @param content 送信する内容
 */
const handleSend = (content: string) => {
  sendMessage(content);
};
</script>

<style lang="scss" scoped>
.chat {
  max-width: 42rem;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &__main {
    flex: 1;
    overflow-y: auto;
  }

  &__footer {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
  }
}
</style>
