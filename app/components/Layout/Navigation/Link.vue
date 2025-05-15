<script setup lang="ts">
const props = defineProps<{
  to: string
  query: string // TODO: add type safe mapping for query matching environment variables
  label: string
}>()
</script>

<template>
  <!-- https://ui.nuxt.com/components/button -->
  <!-- a button is not a link, but seems the UButton component takes care of this -->
  <UButton :to="props.to" :label="props.label" :query="query" variant="ghost" />
</template>
