<script setup lang="ts">
const props = defineProps<{
  data: any
}>()
const { data } = props
const pokemon = data.results
</script>

<template>
  <pre class="bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 overflow-y-scroll overflow-x-hidden max-h-[30ch] text-sm rounded">
    {{ pokemon }}
  </pre>
</template>
