<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination'
import { inject } from 'vue'

// import { useUniverseStore } from '~/stores/universe'

const props = defineProps<{
  items: any
}>()

// const universeStore = useUniverseStore()
const { universe } = inject('universe')
console.warn('items', items)
// const universeSettings = universeStore.getByUniverse(universe)
// if (!universeSettings) {
//   throw new Error('universeSettings not found')
// }

// const paginationStore = usePaginationStore()
// won'st work for the rick and morty api, so this needs to be added to the page settings
// const currentPage = getCurrentPage(items.value.next, items.value.previous)
// paginationStore.update({
//   total: items.value.count,
//   current: 1,
// })
// images are at https://img.pokemondb.net/artwork/{name}.jpg
</script>

<template>
  <ListCard
    v-for="item in props.items"
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
