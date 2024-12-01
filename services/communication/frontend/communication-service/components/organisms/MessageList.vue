<script setup lang="ts">
import type { Message } from "@/types/chat";
import MessageBubble from "~/components/molecules/MessageBubble.vue";

defineProps<{
  messages: Message[];
}>();
</script>

<template>
  <div class="flex flex-col space-y-2 p-4">
    <MessageBubble
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>
