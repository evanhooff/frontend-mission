<!-- PokemonList.vue -->
<script setup  lang="ts">
// import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript'
import { computed, ref } from 'vue'

definePageMeta({
  layout: 'list',
})

// why use nuxt-api-party instead of the baked-in useFetch?
// https://nuxt.com/docs/getting-started/data-fetching#usefetch
const { data } = useRickAndMortyData('character')
// const { data } = await useFetch('https://rickandmortyapi.com/api/character')
</script>

<template>
  <Suspense>
    <LayoutPageSection title="rickandmorty-list" class="rickandmorty-list">
      <!-- Header with search and filters -->
      <ExampleApiResponse :data="data" />
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
