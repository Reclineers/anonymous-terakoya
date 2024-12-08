<template>
  <div class="message-input">
    <BaseInput
      v-model="message"
      placeholder="メッセージを入力..."
      @keyup.enter="handleSend"
      @handleInput="updateInputMessage"
    />
    <BaseButton
      variant="primary"
      @click="handleSend"
      class="message-input__button"
      >送信</BaseButton
    >
  </div>
</template>

<script setup lang="ts">
import { useChat } from "~/composables/chat";
import BaseInput from "~/components/atoms/BaseInput.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";

interface Emits {
  (e: "send", message: string): void;
}

const emit = defineEmits<Emits>();

const { message, updateInputMessage, clearInputMessage } = useChat();

/**
 * メッセージを送信する
 */
const handleSend = () => {
  if (message.value.trim()) {
    emit("send", message.value);
    clearInputMessage();
  }
};
</script>

<style lang="scss" scoped>
.message-input {
  display: flex;
  gap: 0.5rem;

  &__button {
    flex-shrink: 0;
  }
}
</style>
