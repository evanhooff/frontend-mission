<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<template>
  <div>
    <ClientOnly>
      <p>Custom layout for list view of {{ universe }}</p>
      <LayoutSwitcher />
    </ClientOnly>
    <div class="">
      <slot />
    </div>
  </div>
</template>
