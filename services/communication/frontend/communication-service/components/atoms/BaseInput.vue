<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    :placeholder="placeholder"
  >
</template>