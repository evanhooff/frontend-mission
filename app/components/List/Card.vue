<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<!-- Make 2 variants, horizontal and vertical -->
<template>
  <UCard>
    <template #header>
      <slot name="header">
        <!-- <Placeholder class="h-8" /> -->
      </slot>
    </template>
    <slot name="content">
      <!-- <Placeholder class="h-32" /> -->
    </slot>
    <template #footer>
      <slot name="footer">
        <!-- <Placeholder class="h-8" /> -->
      </slot>
    </template>
  </UCard>
</template>
