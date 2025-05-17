<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''
</script>

<template>
  <main>
    <!-- Multiple <h1>s are allowed in HTML5 as long as they're used properly within different semantic sections, like <header>, <main>, <article>, etc. -->
    <!-- and as long there is only 1 visual per page -->
    <slot name="title">
      <h1 class="text-2xl font-bold text-center">
        {{ universe }}
      </h1>
    </slot>

    <slot name="main" />
  </main>
  <aside>
    <slot name="aside" />
  </aside>
  <aside>
    <slot name="footer" />
  </aside>
</template>
