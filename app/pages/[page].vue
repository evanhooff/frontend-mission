<script setup lang="ts">
// import { getCurrentPage } from '@/helpers/pagination.helper'
import { PageSection } from '#components'
import { useUniverseStore } from '@/stores/universe'

// could this be done on router?
export interface UniverseSettings {
  title: string
  description: string
  imagetemplate: string
  endpoint: string
  universe: string
}

// todo do call only when universe is not in store
const { path } = useRoute()
const { data: page } = await useAsyncData(path, () => {
  return queryCollection('content').path(path).first()
})

const universeSettings = computed(() => {
  return {
    title: page.value?.title,
    label: page.value?.label,
    description: page.value?.description,
    endpoint: page.value?.endpoint,
    universe: page.value?.universe,
    imagetemplate: page.value?.imagetemplate,
  } as UniverseSettings
})
const universeStore = useUniverseStore()
universeStore.storeUniverseSettings({
  universe: universeSettings.value.universe,
  endpoint: universeSettings.value.endpoint,
  imagetemplate: universeSettings.value.imagetemplate,
})
universeStore.setCurrentUniverse(universeSettings.value.universe)

// get data from the endpoint, cache via nuxtApp
// with key not possible? https://github.com/nuxt/nuxt/issues/21532 -> use pinia
// why use nuxt-api-party instead of the baked-in useFetch?
// https://nuxt.com/docs/getting-started/data-fetching#usefetch
// const { data: items } = useNuxtData(`${ref(universe)}`)

// todo do call only when universe is not in store
const { data: response } = await useFetch(() => universeSettings.value?.endpoint)

const items = computed(() => {
  return response.value?.results
}) as any

universeStore.storeItemsPerUniverse(universeSettings.value.universe, items.value || [])

definePageMeta({
  layout: 'list',
})
</script>

<template>
  <ApplicationBaseLayout>
    <template #header>
      <h1>{{ universeSettings?.title || 'undefined' }}</h1>
    </template>
    <template #main>
      <PageSection :title="`List of ${universeSettings?.label}`">
        <ListItems />
      </PageSection>
    </template>
    <template #footer>
      <LayoutPagination />
    </template>
  </ApplicationBaseLayout>
</template>
