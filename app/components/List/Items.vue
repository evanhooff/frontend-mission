<script setup lang="ts">
import type { VariantProps } from 'tailwind-variants'
import { ClientOnly } from '#components'
import { useUniverseStore } from '@/stores/universe'
import { tv } from 'tailwind-variants'

const store = useUniverseStore()
const { getCurrentUniverse: universe, getItemsPerUniverse: getItems, getCurrentUniverseSettings: settings } = storeToRefs(store)

const items = getItems.value(universe.value)

const imagetemplate = settings.value?.imagetemplate || ''

// nice inspiration for pokemon: https://nl.pinterest.com/pin/81416705759334276/

const listStyle = tv({
  slots: {
    container: '',
    content: 'flex w-full gap-4 place-content-between',
  },
  variants: {
    variant: {
      list: {
        container: 'flex flex-col flex-wrap w-full gap-4',
        content: 'w-full',
      },
      grid: {
        container: 'grid grid-cols-4 gap-4 text-center',
        content: 'flex-col flex-wrap',
      },
    },
  },
})

const pageLayout = useLocalStorage<'grid' | 'list'>('pageLayout', 'list')

function changePageLayout(layout: 'grid' | 'list') {
  pageLayout.value = layout
}

const listVariant = computed(() =>
  listStyle({
    variant: pageLayout.value,
  }),
)
</script>

<template>
  <div>
    <UButton @click="setPageLayout('grid'); changePageLayout('grid')">
      Grid
    </UButton>
    <UButton @click="() => { setPageLayout('list'); changePageLayout('list') }">
      List
    </UButton>
    <div data-items="true" :class="listVariant.container()">
      <ClientOnly>
        <ListCard
          v-for="item in items"
          :key="item.name"
          :class="listVariant.content()"
        >
          <template #header>
            <span>
              {{ item.name }}
            </span>
          </template>

          <template #content>
            <Image :item="item" :imagetemplate="imagetemplate" />
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
  </div>
</template>
