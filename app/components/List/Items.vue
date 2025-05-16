<script setup lang="ts">
import { ClientOnly } from '#components'
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()

const universe = universeStore.getCurrentUniverse || ''
const items = computed(() => universeStore.getItemsPerUniverse(universe))
const settings = computed(() => universeStore.getSettingsByUniverse(universe))

const imageTemplate = computed(() => {
  return settings.value?.imagetemplate.replace(/\$\{(.*?)\}/g, (_, match) => {
    return item[match] || ''
  })
})
</script>

<template>
  <ListCard
    v-for="item in items"
    :key="item.name"
  >
    <template #header>
      <div>
        {{ item.name }} {{ settings?.imagetemplate }}
      </div>
    </template>

    <template #content>
      <div>
        <ClientOnly>
          <Image :item="item" :imagetemplate="settings?.imagetemplate" />
        </ClientOnly>
        {{ item.url }}
      </div>
    </template>
    <template #footer>
      <UButton no-prefetch :to="`/${universe}/${item.name}`" :label="item.name" variant="ghost" />
      <!-- <UButton no-prefetch :to="`${item.name}`" :label="item.name" variant="ghost" /> -->
    </template>
  </ListCard>
</template>
