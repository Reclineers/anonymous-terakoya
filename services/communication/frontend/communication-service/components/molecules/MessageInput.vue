<script setup lang="ts">
import BaseInput from "~/components/atoms/BaseInput.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";

const message = ref("");
const emit = defineEmits<{
  (e: "send", message: string): void;
}>();

const handleSend = () => {
  if (message.value.trim()) {
    emit("send", message.value);
    message.value = "";
  }
};
</script>

<template>
  <div class="flex gap-2">
    <BaseInput
      v-model="message"
      placeholder="メッセージを入力..."
      @keyup.enter="handleSend"
    />
    <BaseButton variant="primary" @click="handleSend"> 送信 </BaseButton>
  </div>
</template>
