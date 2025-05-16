<script setup lang="ts">
const props = defineProps<{
  className: string
}>()
</script>

<template>
  <div :class="`${props.className}`" aria-live="polite" aria-busy="true">
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-grey-300 leading-none">
      ‌
    </span>
    <br>
  </div>
</template>
