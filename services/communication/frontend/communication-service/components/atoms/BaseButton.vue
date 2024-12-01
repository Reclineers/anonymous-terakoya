<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
}>()
</script>

<template>
  <button class="px-4 py-2 rounded-md font-medium" :class="[
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:bg-blue-600'
      : 'bg-gray-200 hover:bg-gray-300'
  ]">
    <slot />
  </button>
</template>