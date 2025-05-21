<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<template>
  <div :class="`list-layout-${universe}`">
    <!-- room for site-wide content, like notifications or modals -->
    <slot />
  </div>
</template>
