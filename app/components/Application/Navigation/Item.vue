<script setup lang="ts">
const props = defineProps<{
  to: string
  label: string
}>()
</script>

<template>
  <!-- https://ui.nuxt.com/components/button -->
  <!-- a <button> is not a link with proper <a>,
    but seems the UButton component takes care of this -->
  <UButton :to="props.to" :label="props.label" variant="ghost" />
</template>
