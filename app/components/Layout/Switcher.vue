<script setup lang="ts">
import { useLayoutSwitcher } from '~/composables/useLayoutSwitcher'

const pageLayout = ref(useLayoutSwitcher) || 'grid'
</script>

<template>
  <div>
    <UButton :active="pageLayout === 'grid'" @click="pageLayout = 'grid'">
      Grid
    </UButton>
    <UButton :active="pageLayout === 'list'" @click="pageLayout = 'list'">
      List
    </UButton>
  </div>
</template>
