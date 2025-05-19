<script setup lang="ts">
import { ClientOnly } from '#components'
import { useUniverseStore } from '@/stores/universe'

const store = useUniverseStore()
const { getCurrentUniverse: universe, getItemsPerUniverse: getItems, getCurrentUniverseSettings: settings } = storeToRefs(store)

const items = getItems.value(universe.value)

const imagetemplate = settings.value?.imagetemplate || ''

// nice inspiration for pokemon: https://nl.pinterest.com/pin/81416705759334276/
</script>

<template>
  <div data-list="true">
    <ClientOnly>
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
            <Image :item="item" :imagetemplate="imagetemplate" />
          </div>
        </template>
        <template #footer>
          <UButton no-prefetch :to="`/${universe}/${item.name}`" :label="item.name" variant="ghost" />
        </template>
      </ListCard>

      <template #fallback>
        <!-- TODO: define skeleton -->
        <div class="text-center">
          loading ...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
