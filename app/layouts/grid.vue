<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<template>
  <div>
    <UButton @click="setPageLayout('grid')">
      Grid
    </UButton>
    <UButton @click="setPageLayout('list')">
      List
    </UButton>
    <ClientOnly><p>Custom layout for grid view of {{ universe }}</p></ClientOnly>
    <div class="[&_data-list=true]:grid">
      <slot />
    </div>
  </div>
</template>
