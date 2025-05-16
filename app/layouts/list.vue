<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<template>
  <div class="min-h-[calc(100vh-var(--application-header-height))] pt-[var(--application-header-height)] isolate">
    <ClientOnly><p>Custom layout for list view for {{ universe }}</p></ClientOnly>
    <button @click="setPageLayout('grid')">
      Grid
    </button>
    <slot />
    <LayoutPagination />
  </div>
</template>
