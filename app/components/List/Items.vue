<script setup lang="ts">
import { ClientOnly } from '#components'
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()

const currentUniverse = universeStore.getCurrentUniverse || ''

const universeSettings = computed(() => currentUniverse ? universeStore.getSettingsByUniverse(currentUniverse) : null)

// get data from the endpoint, cache via nuxtApp?
// with key not possible? https://github.com/nuxt/nuxt/issues/21532 -> use pinia
// why use nuxt-api-party instead of the baked-in useFetch?
// https://nuxt.com/docs/getting-started/data-fetching#usefetch
// const { data: items } = useNuxtData(`${ref(universe)}`)

// todo do call only when universe is not in store
const { data: response } = await useFetch(() => universeSettings.value?.endpoint)

const items = computed(() => {
  return response.value?.results
})

universeStore.storeItemsPerUniverse(universeSettings.value?.universe || '', items.value || [])

// nice inspiration for pokemon: https://nl.pinterest.com/pin/81416705759334276/
</script>

<template>
  <div data-list="true">
    <ListCard
      v-for="item in items"
      :key="item.name"
    >
      <template #header>
        <div>
          {{ item.name }}
        </div>
      </template>

      <template #content>
        <div>
          <ClientOnly>
            <Image :item="item" :imagetemplate="universeSettings?.imagetemplate" />
          </ClientOnly>
        </div>
      </template>
      <template #footer>
        <UButton no-prefetch :to="`/${currentUniverse}/${item.name}`" :label="item.name" variant="ghost" />
      </template>
    </ListCard>
  </div>
</template>
