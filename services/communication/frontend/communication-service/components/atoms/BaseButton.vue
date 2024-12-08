<template>
  <button
    class="base-button"
    :class="[`base-button--${props.variant}`]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "secondary",
});

interface Emits {
  (e: "onClick"): void;
}

const emit = defineEmits<Emits>();

const onClick = () => {
  emit("onClick");
};
</script>

<style lang="scss" scoped>
.base-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;

  &--primary {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }

  &--secondary {
    background-color: #e5e7eb;

    &:hover {
      background-color: #d1d5db;
    }
  }
}
</style>
