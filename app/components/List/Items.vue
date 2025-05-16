<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()

const { universe } = inject('universe')
const items = computed(() => universeStore.getItemsPerUniverse(universe))

// images are at https://img.pokemondb.net/artwork/{name}.jpg
</script>

<template>
  <ListCard
    v-for="item in items"
    :key="item.name"
  >
    <template #header>
      <div>{{ item.name }}</div>
    </template>

    <template #content>
      <div>{{ item.url }}</div>
    </template>
    <template #footer>
      <UButton no-prefetch :to="`/${universe}/${item.name}`" :label="item.name" variant="ghost" />
      <!-- <UButton no-prefetch :to="`${item.name}`" :label="item.name" variant="ghost" /> -->
    </template>
  </ListCard>
</template>
