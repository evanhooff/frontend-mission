<script setup lang="ts">
// import { useUniverseStore } from '@/stores/universe'

// const universeStore = useUniverseStore()
// const universe = universeStore.getCurrentUniverse || ''
</script>

<!-- Make 2 variants, horizontal and vertical -->
<template>
  <UCard variant="subtle" :ui="{ header: 'p-0 py-2 sm:p-0 sm:py-2', footer: 'p-0 sm:p-0 max-h-[2rem]', body: 'p-0 sm:p-0' }">
    <template #header>
      <slot name="header" />
    </template>
    <slot name="content" />
    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
