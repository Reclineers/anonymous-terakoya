<script setup lang="ts">
import type { Message } from "@/types/chat";

defineProps<{
  message: Message;
}>();
</script>

<template>
  <div
    class="max-w-[70%] p-3 rounded-lg mb-2"
    :class="[
      message.isOwn ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200',
    ]"
  >
    <p>{{ message.content }}</p>
    <span class="text-xs opacity-70">
      {{ new Date(message.timestamp).toLocaleTimeString() }}
    </span>
  </div>
</template>
