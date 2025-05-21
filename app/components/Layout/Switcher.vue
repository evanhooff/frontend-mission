<script setup lang="ts">
import { useLayoutSwitcher } from '~/composables/useLayoutSwitcher'

const pageLayout = ref(useLayoutSwitcher) || 'grid'
</script>

<template>
  <div>
    <UButton @click="pageLayout = 'grid'">
      Grid
    </UButton>
    <UButton @click="pageLayout = 'list'">
      List
    </UButton>
  </div>
</template>
