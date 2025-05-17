<script setup lang="ts">
import { UButton } from '#components'
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
    <ClientOnly><p>Custom layout for list view of {{ universe }}</p></ClientOnly>
    <!-- TODO: use tailwind variants for base layout styling -->
    <div class="[&_[data-list=true]]:flex">
      <slot />
    </div>
  </div>
</template>
