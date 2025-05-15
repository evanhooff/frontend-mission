<script setup lang="ts">
// import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript'
// import { computed, ref } from 'vue'

const { path } = useRoute()
// const runtimeConfig = useRuntimeConfig()

const { data: page } = await useAsyncData(path, () => {
  return queryCollection('content').path(path).first()
})
// console.warn('pageSettings', page.value?.body.endpoint)
// not working
// console.warn(runtimeConfig.API_ENDPOINT_POKEMON)

interface PageSettings {
  title: string
  description: string
  image: string
  endpoint: string
}

const pageSettings = computed(() => {
  return {
    title: page.value?.title,
    description: page.value?.description,
    image: page.value?.image,
    endpoint: page.value?.endpoint,
  } as PageSettings
})

const { data: items } = await useFetch(pageSettings.value.endpoint)
console.warn('items', items.value)
// const items = computed(() => {
//   return $fetch(pageSettings.value.endpoint)
// })

definePageMeta({
  layout: 'list',
})
// const { data } = await $externalApis(
//   'pokemon',
//   {
//     headers: {
//       'externalApis-Endpoint-Url': 'https://pokeapi.co/api/v2',
//     },
//   },
// )

// why use nuxt-api-party instead of the baked-in useFetch?
// https://nuxt.com/docs/getting-started/data-fetching#usefetch
// const { data } = usePokemonData(pokemon)
// const { data } = await useFetch('https://pokeapi.co/api/v2/pokemon')
// images are at https://img.pokemondb.net/artwork/{name}.jpg

// Type to color mapping
// could come from https://pokeapi.co/api/v2/type/1 sprite
// const typeColors = {
//   Grass: 'bg-green-500',
//   Poison: 'bg-purple-500',
//   Fire: 'bg-red-500',
//   Water: 'bg-blue-500',
//   Electric: 'bg-yellow-500',
//   Normal: 'bg-gray-500',
//   Bug: 'bg-lime-500',
//   Flying: 'bg-sky-400',
//   Fighting: 'bg-orange-600',
//   Psychic: 'bg-pink-500',
//   Rock: 'bg-amber-700',
//   Ground: 'bg-amber-500',
//   Ghost: 'bg-indigo-600',
//   Ice: 'bg-cyan-400',
//   Dragon: 'bg-violet-600',
//   Dark: 'bg-gray-700',
//   Steel: 'bg-slate-400',
//   Fairy: 'bg-pink-300',
// }
</script>

<template>
  <Suspense>
    <LayoutPageSection :title="pageSettings?.title">
      <!-- Header with search and filters -->
      <ListCard
        v-for="item in items.results"
        :key="item.name"
      >
        <template #header>
          <div>{{ item.name }}</div>
        </template>

        <template #content>
          <div>{{ item.name }}</div>
        </template>
        <template #footer>
          <div>{{ item.url }}</div>
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
