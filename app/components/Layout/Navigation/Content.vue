<script setup lang="ts">
// import type { ContentNavigationItem } from '@nuxt/content'
const { data: navigation } = await useAsyncData('content', () => queryCollectionNavigation('content'))
</script>

<template>
  <nav>
    <LayoutNavigationLink
      v-for="(item, index) in navigation"
      :key="index"
      :to="item.path"
      :label="item.title"
    />
    <!-- <LayoutNavigationLink to="/" label="Home" /> -->
    <!-- <UNavigationMenu :items="navigation" class="w-full justify-center" /> -->
  </nav>
</template>
