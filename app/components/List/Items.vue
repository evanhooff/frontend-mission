<script setup lang="ts">
import { ClientOnly } from '#components'
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()

const universe = universeStore.getCurrentUniverse || ''
const items = computed(() => universeStore.getItemsPerUniverse(universe))
const settings = computed(() => universeStore.getSettingsByUniverse(universe))

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
            <Image :item="item" :imagetemplate="settings?.imagetemplate" />
          </ClientOnly>
        </div>
      </template>
      <template #footer>
        <UButton no-prefetch :to="`/${universe}/${item.name}`" :label="item.name" variant="ghost" />
      </template>
    </ListCard>
  </div>
</template>
