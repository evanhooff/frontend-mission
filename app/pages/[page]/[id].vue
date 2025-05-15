<!-- PokemonList.vue -->
<script setup  lang="ts">
// import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript'
import { computed, ref } from 'vue'

// why use nuxt-api-party instead of the baked-in useFetch?
// https://nuxt.com/docs/getting-started/data-fetching#usefetch
// const { data } = usePokemonData('pokemon')
const { data } = await useFetch('https://pokeapi.co/api/v2/pokemon')

// per pokemon:
// const { id } = useRoute().params

// const { data, error } = await useAsyncData(`user:${id}`, () => {
//   return myGetFunction('users', { id })
// })

// Type to color mapping
const typeColors = {
  Grass: 'bg-green-500',
  Poison: 'bg-purple-500',
  Fire: 'bg-red-500',
  Water: 'bg-blue-500',
  Electric: 'bg-yellow-500',
  Normal: 'bg-gray-500',
  Bug: 'bg-lime-500',
  Flying: 'bg-sky-400',
  Fighting: 'bg-orange-600',
  Psychic: 'bg-pink-500',
  Rock: 'bg-amber-700',
  Ground: 'bg-amber-500',
  Ghost: 'bg-indigo-600',
  Ice: 'bg-cyan-400',
  Dragon: 'bg-violet-600',
  Dark: 'bg-gray-700',
  Steel: 'bg-slate-400',
  Fairy: 'bg-pink-300',
}

// UI state
const searchQuery = ref('')
const selectedTypes = ref([])
const isFilterOpen = ref(false)
const isSortOpen = ref(false)
const sortKey = ref('id')
const sortDirection = ref('asc')

// Get all unique types
const allTypes = computed(() => {
  const types = new Set()
  pokemonData.forEach((pokemon) => {
    pokemon.types.forEach(type => types.add(type))
  })
  return [...types]
})

// // Filter and sort Pokemon
// const filteredPokemon = computed(() => {
//   return pokemonData
//     .filter((pokemon) => {
//       // Filter by search query
//       const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//         || pokemon.id.toString() === searchQuery.value

//       // Filter by selected types
//       const matchesType = selectedTypes.value.length === 0
//         || pokemon.types.some(type => selectedTypes.value.includes(type))

//       return matchesSearch && matchesType
//     })
//     .sort((a, b) => {
//       // Sort by selected key
//       if (sortDirection.value === 'asc') {
//         return a[sortKey.value] > b[sortKey.value] ? 1 : -1
//       }
//       else {
//         return a[sortKey.value] < b[sortKey.value] ? 1 : -1
//       }
//     })
// })

// // Sort Pokemon
// function sortBy(key) {
//   if (sortKey.value === key) {
//     // Toggle direction if same key
//     sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
//   }
//   else {
//     // Set new key and reset direction
//     sortKey.value = key
//     sortDirection.value = 'asc'
//   }
// }

// // Remove type filter
// function removeType(type) {
//   selectedTypes.value = selectedTypes.value.filter(t => t !== type)
// }

// Get CSS class for Pokemon type
function getTypeClass(type: string) {
  return typeColors[type] || 'bg-gray-500'
}
</script>

<template>
  <Suspense>
    <LayoutPageSection title="pokemon-list" class="pokemon-list">
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
