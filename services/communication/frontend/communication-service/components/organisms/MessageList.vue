<template>
  <div class="message-list">
    <MessageBubble
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script setup lang="ts">
import { useChat } from "~/composables/chat";
import MessageBubble from "~/components/molecules/MessageBubble.vue";

const { messages } = useChat();
</script>

<style lang="scss" scoped>
.message-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}
</style>
