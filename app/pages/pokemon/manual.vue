<!-- PokemonList.vue -->
<script setup>
import { computed, ref } from 'vue'

// Pokemon data
const pokemonData = [
  {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['Grass', 'Poison'],
    cp: 1071,
    hp: 128,
  },
  {
    id: 4,
    name: 'Charmander',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['Fire'],
    cp: 980,
    hp: 118,
  },
  {
    id: 7,
    name: 'Squirtle',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    types: ['Water'],
    cp: 940,
    hp: 127,
  },
  {
    id: 25,
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['Electric'],
    cp: 887,
    hp: 111,
  },
  {
    id: 133,
    name: 'Eevee',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    types: ['Normal'],
    cp: 963,
    hp: 146,
  },
  {
    id: 54,
    name: 'Psyduck',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png',
    types: ['Water'],
    cp: 1109,
    hp: 137,
  },
]

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

// Filter and sort Pokemon
const filteredPokemon = computed(() => {
  return pokemonData
    .filter((pokemon) => {
      // Filter by search query
      const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || pokemon.id.toString() === searchQuery.value

      // Filter by selected types
      const matchesType = selectedTypes.value.length === 0
        || pokemon.types.some(type => selectedTypes.value.includes(type))

      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      // Sort by selected key
      if (sortDirection.value === 'asc') {
        return a[sortKey.value] > b[sortKey.value] ? 1 : -1
      }
      else {
        return a[sortKey.value] < b[sortKey.value] ? 1 : -1
      }
    })
})

// Sort Pokemon
function sortBy(key) {
  if (sortKey.value === key) {
    // Toggle direction if same key
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  }
  else {
    // Set new key and reset direction
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

// Remove type filter
function removeType(type) {
  selectedTypes.value = selectedTypes.value.filter(t => t !== type)
}

// Get CSS class for Pokemon type
function getTypeClass(type) {
  return typeColors[type] || 'bg-gray-500'
}
</script>

<template>
  <div class="pokemon-list">
    <!-- Header with search and filters -->
    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 class="text-2xl font-bold text-gray-800">
          Pokédex
        </h1>

        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <!-- Search bar -->
          <div class="relative flex-grow">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Pokémon"
              class="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
          </div>

          <!-- Filter dropdown -->
          <div class="relative">
            <button
              class="flex items-center justify-between px-4 py-2 w-full sm:w-32 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              @click="isFilterOpen = !isFilterOpen"
            >
              <span>Filter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>

            <div v-if="isFilterOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="p-2">
                <div v-for="type in allTypes" :key="type" class="px-2 py-1">
                  <label class="flex items-center">
                    <input
                      v-model="selectedTypes"
                      type="checkbox"
                      :value="type"
                      class="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                    >
                    <span>{{ type }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Sort dropdown -->
          <div class="relative">
            <button
              class="flex items-center justify-between px-4 py-2 w-full sm:w-32 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              @click="isSortOpen = !isSortOpen"
            >
              <span>Sort</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>

            <div v-if="isSortOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="p-2">
                <button
                  class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                  @click="sortBy('id'); isSortOpen = false"
                >
                  ID Number
                </button>
                <button
                  class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                  @click="sortBy('name'); isSortOpen = false"
                >
                  Name (A-Z)
                </button>
                <button
                  class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                  @click="sortBy('cp'); isSortOpen = false"
                >
                  Combat Power
                </button>
                <button
                  class="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                  @click="sortBy('hp'); isSortOpen = false"
                >
                  HP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active filters -->
      <div v-if="selectedTypes.length > 0" class="mt-4 flex flex-wrap gap-2">
        <div
          v-for="type in selectedTypes"
          :key="type"
          class="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
        >
          {{ type }}
          <button class="ml-2 text-indigo-600 hover:text-indigo-800" @click="removeType(type)">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Pokemon Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="pokemon in filteredPokemon"
        :key="pokemon.id"
        class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
      >
        <div class="relative pb-3/4">
          <!-- Pokemon image with gradient background -->
          <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
            <img :src="pokemon.image" :alt="pokemon.name" class="w-32 h-32 object-contain">
          </div>

          <!-- Pokemon ID number -->
          <div class="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
            #{{ pokemon.id.toString().padStart(3, '0') }}
          </div>
        </div>

        <div class="p-4">
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            {{ pokemon.name }}
          </h2>

          <!-- Pokemon types -->
          <div class="flex gap-2 mb-4">
            <span
              v-for="type in pokemon.types"
              :key="type"
              :class="getTypeClass(type)"
              class="px-3 py-1 rounded-full text-xs font-medium text-white"
            >
              {{ type }}
            </span>
          </div>

          <!-- Pokemon stats -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-50 rounded p-2 text-center">
              <div class="text-sm text-gray-500">
                CP
              </div>
              <div class="font-bold text-gray-800">
                {{ pokemon.cp }}
              </div>
            </div>
            <div class="bg-gray-50 rounded p-2 text-center">
              <div class="text-sm text-gray-500">
                HP
              </div>
              <div class="font-bold text-gray-800">
                {{ pokemon.hp }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <style>
  /* For the image container aspect ratio */
.pb-3\/4 {
  padding-bottom: 75%;
}
</style>
