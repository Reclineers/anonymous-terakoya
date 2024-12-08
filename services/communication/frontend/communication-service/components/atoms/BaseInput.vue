<template>
  <input
    :value="props.modelValue"
    @input="handleInput"
    class="base-input"
    :placeholder="props.placeholder"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
});

interface Emits {
  (e: "handleInput", value: string): void;
}

const emit = defineEmits<Emits>();

const handleInput = (e: Event) => {
  emit("handleInput", (e.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  &::placeholder {
    color: #9ca3af;
  }
}
</style>
