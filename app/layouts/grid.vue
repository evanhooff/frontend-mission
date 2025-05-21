<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'
import { useLayoutSwitcher } from '~/composables/useLayoutSwitcher'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<template>
  <div>
    <ClientOnly>
      <p>Custom layout for grid view of {{ universe }}</p>
      <LayoutSwitcher />
    </ClientOnly>
    <div class="">
      <slot />
    </div>
  </div>
</template>
