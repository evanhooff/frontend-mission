<script setup lang="ts">
// import { getCurrentPage } from '@/helpers/pagination.helper'
import { LayoutSkeleton, ListItems } from '#components'
import { useUniverseStore } from '~/stores/universe'

export interface UniverseSettings {
  title: string
  description: string
  images: string
  endpoint: string
  universe: string
}

const { path } = useRoute()
const { data: page } = await useAsyncData(path, () => {
  return queryCollection('content').path(path).first()
})

const universeSettings = computed(() => {
  return {
    title: page.value?.title,
    description: page.value?.description,
    images: page.value?.images,
    endpoint: page.value?.endpoint,
    universe: page.value?.universe,
  } as UniverseSettings
})
const universeStore = useUniverseStore()
universeStore.storeUniverseEndpoint({ universe: universeSettings.value.universe, endpoint: universeSettings.value.endpoint })

const universe = ref(universeSettings.value?.universe)
provide('universe', { universe })

// get data from the endpoint, cache via nuxtApp
// with key not possible? https://github.com/nuxt/nuxt/issues/21532 -> use pinia
// why use nuxt-api-party instead of the baked-in useFetch?
// https://nuxt.com/docs/getting-started/data-fetching#usefetch
// const { data: items } = useNuxtData(`${ref(universe)}`)
const { pending, data: response, refresh } = await useFetch(() => universeSettings.value?.endpoint)

const items = computed(() => {
  return response.value?.results
}) as any

universeStore.storeItemsPerUniverse(universeSettings.value.universe, items.value || [])

definePageMeta({
  layout: 'list',
})
</script>

<template>
  <Suspense>
    <LayoutSkeleton v-if="pending" class-name="w-full h-100" />
    <LayoutPageSection v-else :title="universeSettings?.title || 'undefined'">
      <button @click="refresh">
        Refresh
      </button>
      <ListItems />
    </LayoutPageSection>
    <template #placeholder>
      <LayoutSkeleton class-name="w-full h-100" />
    </template>
  </Suspense>
</template>

<style>
  /* For the image container aspect ratio */
.pb-3\/4 {
  padding-bottom: 75%;
}
</style>
