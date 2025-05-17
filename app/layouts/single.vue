<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<template>
  <div>
    <ClientOnly><p>Custom layout for single item of {{ universe }}</p></ClientOnly>
    <slot />
  </div>
</template>
