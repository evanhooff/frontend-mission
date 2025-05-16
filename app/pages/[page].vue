<script setup lang="ts">
// import { getCurrentPage } from '@/helpers/pagination.helper'
import { usePaginationStore } from '@/stores/pagination'
import { provide, ref } from 'vue'

// TODO: abstract the function to a composable
// TODO: provide page settings to the child components
const { path } = useRoute()
const { data: page } = await useAsyncData(path, () => {
  return queryCollection('content').path(path).first()
})

// TODO: abstract type definition to /types folder
interface PageSettings {
  title: string
  description: string
  image: string
  endpoint: string
  universe: string
}
const pageSettings = computed(() => {
  return {
    title: page.value?.title,
    description: page.value?.description,
    image: page.value?.image,
    endpoint: page.value?.endpoint,
    universe: page.value?.universe,
  } as PageSettings
})

// provide page settings to the child components
const universe = ref(pageSettings.value.universe)
provide('universe', { universe })

// get data from the endpoint, cache via nuxtApp
// with key not possible? https://github.com/nuxt/nuxt/issues/21532 -> use pinia
// why use nuxt-api-party instead of the baked-in useFetch?
// https://nuxt.com/docs/getting-started/data-fetching#usefetch
// const { data: items } = useNuxtData(`${ref(universe)}`)

const { data: items } = await useFetch(pageSettings.value.endpoint)

const paginationStore = usePaginationStore()
// won'st work for the rick and morty api, so this needs to be added to the page settings
// const currentPage = getCurrentPage(items.value.next, items.value.previous)
paginationStore.update({
  total: items.value.count,
  current: 1,
})

definePageMeta({
  layout: 'list',
})

// images are at https://img.pokemondb.net/artwork/{name}.jpg
</script>

<template>
  <Suspense>
    <LayoutPageSection :title="pageSettings?.title || 'undefined'">
      <!-- Header with search and filters -->
      <ListCard
        v-for="item in items.results"
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
    </LayoutPageSection>

    <!-- loading state via #fallback slot -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style>
  /* For the image container aspect ratio */
.pb-3\/4 {
  padding-bottom: 75%;
}
</style>
