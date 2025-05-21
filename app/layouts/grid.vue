<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'
import { useLayoutSwitcher } from '~/composables/useLayoutSwitcher'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<template>
  <div :class="`grid-layout-${universe}`">
    <!-- room for site-wide content, like notifications or modals -->
    <slot />
  </div>
</template>
