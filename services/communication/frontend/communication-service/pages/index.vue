<script setup lang="ts">
import { useChatStore } from "@/stores/chat";
import MessageList from "~/components/organisms/MessageList.vue";
import MessageInput from "~/components/molecules/MessageInput.vue";

const chatStore = useChatStore();

const handleSend = (content: string) => {
  chatStore.sendMessage(content);
};
</script>

<template>
  <div class="max-w-2xl mx-auto h-screen flex flex-col">
    <header class="p-4 border-b">
      <h1 class="text-xl font-bold">Chat</h1>
    </header>

    <main class="flex-1 overflow-y-auto">
      <MessageList :messages="chatStore.messages" />
    </main>

    <footer class="p-4 border-t">
      <MessageInput @send="handleSend" />
    </footer>
  </div>
</template>
