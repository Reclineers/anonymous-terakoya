<template>
  <div
    class="message-bubble"
    :class="[message.isOwn ? 'message-bubble--own' : 'essage-bubble--other']"
  >
    <p class="message-bubble__content">{{ props.message.content }}</p>
    <span class="message-bubble__timestamp">
      {{ formattedTime }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "@/types/chat";
import { useChat } from "~/composables/chat";

interface Props {
  message: Message;
}

const props = defineProps<Props>();

const { formatMessageTime } = useChat();

/**
 * 日時を整形した文字列
 */
const formattedTime = computed(() => {
  return formatMessageTime(props.message.timestamp);
});
</script>

<style lang="scss" scoped>
.message-bubble {
  max-width: 70%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;

  &--own {
    margin-left: auto;
    background-color: #3b82f6;
    color: white;
  }

  &--other {
    margin-right: auto;
    background-color: #e5e7eb;
  }

  &__content {
    margin: 0;
  }

  &__timestamp {
    font-size: 0.75rem;
    opacity: 0.7;
  }
}
</style>
