<script setup lang="ts">
import type { VariantProps } from 'tailwind-variants'
import { useUniverseStore } from '@/stores/universe'
import { tv } from 'tailwind-variants'

const store = useUniverseStore()
const { getCurrentUniverse: universe, getItemsPerUniverse: getItems, getCurrentUniverseSettings: settings } = storeToRefs(store)

const items = getItems.value(universe.value) || Array.from({ length: 20 }, index => ({ id: index }))

const imagetemplate = settings.value?.imagetemplate || ''

const listStyle = tv({
  slots: {
    container: 'block w-full',
    content: 'flex w-full gap-4 place-content-between',
  },
  variants: {
    variant: {
      list: {
        container: 'flex flex-col flex-wrap w-full gap-4',
        content: 'w-full',
      },
      grid: {
        container: 'grid grid-cols-3 md:grid-cols-4 gap-4 text-center',
        content: 'flex-col flex-wrap',
      },
    },
  },
})

export type pageLayoutProps = VariantProps<typeof listStyle>

const layoutVariant = ref(useLayoutSwitcher) || 'grid'

const listVariant = computed(() =>
  listStyle({
    variant: layoutVariant.value,
  }),
)
</script>

<template>
  <div>
    <!-- TODO: set Suspense back with proper skeleton -->
    <!-- TODO: Use a composable to render as grid card or list card -->
    <ClientOnly>
      <div
        v-if="layoutVariant === 'list'" data-items="true"
        :class="listVariant.container()"
      >
        <ListCard
          v-for="item in items"
          :key="item.name"
          :class="listVariant.content()"
          :universe="universe"
          :item="item"
          :imagetemplate="imagetemplate"
        />
      </div>
      <div v-else data-items="true" :class="listVariant.container()">
        <GridCard
          v-for="item in items"
          :key="item.name"
          :class="listVariant.content()"
          :universe="universe"
          :item="item"
          :imagetemplate="imagetemplate"
        />

        <LayoutPagination />
      </div>
    </ClientOnly>
  </div>
</template>
