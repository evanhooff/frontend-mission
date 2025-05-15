<!-- Make 2 variants, horizontal and vertical -->
<script setup>
import { inject } from 'vue'

// styling based on universe
const { universe } = inject('universe')
// use tailwindcss to set the theme of the universe
</script>

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
