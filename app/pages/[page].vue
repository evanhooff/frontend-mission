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
console.warn('path', path)
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
console.warn('universeSettings', universe)
provide('universe', { universe })
const foo = useFoo()
console.warn('foo', foo)

// get data from the endpoint, cache via nuxtApp
// with key not possible? https://github.com/nuxt/nuxt/issues/21532 -> use pinia
// why use nuxt-api-party instead of the baked-in useFetch?
// https://nuxt.com/docs/getting-started/data-fetching#usefetch
// const { data: items } = useNuxtData(`${ref(universe)}`)
const { pending, data: response, refresh } = await useFetch(() => universeSettings.value?.endpoint)
// const { pending, data: response, refresh } = useFetch(universeSettings.value?.endpoint, { lazy: false })
// const items = ref()
// try {
//   const { pending, data } = useFetch(universeSettings.value.endpoint, { lazy: false })
//   items.value = data.value.results
// }
// catch (error) {
//   console.error('Error fetching data:', error)
// }
const items = computed(() => {
  return response.value?.results
}) as any

definePageMeta({
  layout: 'list',
})
</script>

<template>
  <div>
    <LayoutSkeleton v-if="pending" />
    <div v-else>
      <button @click="refresh">
        Refresh
      </button>
      <!-- <ClientOnly>
        <ListItems :items="items" />
      </ClientOnly> -->
      <span v-for="(item, index) in items" :key="index">
        {{ item.name }}
      </span>
    </div>
  </div>
  <!-- <ClientOnly>
    <Suspense>
      <LayoutPageSection :title="universeSettings?.title || 'undefined'">
        <Suspense>
          <ListItems :items="items.value" />
          loading state via #fallback slot
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </LayoutPageSection>
      <template #fallback>
        <LayoutSkeleton />
      </template>
    </Suspense>
    <template #placeholder>
      <LayoutSkeleton />
    </template>
  </ClientOnly> -->
</template>

<style>
  /* For the image container aspect ratio */
.pb-3\/4 {
  padding-bottom: 75%;
}
</style>
