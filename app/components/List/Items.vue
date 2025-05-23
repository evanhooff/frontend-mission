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
  },
  variants: {
    variant: {
      list: {
        container: 'flex flex-col flex-wrap w-full gap-4',
      },
      grid: {
        container: 'grid grid-cols-3 md:grid-cols-4 gap-4 text-center',
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
  <Suspense>
    <div data-items="true" :class="listVariant.container()">
      <ListItem
        v-for="item in items"
        :key="item.name"
        :universe="universe"
        :item="item"
        :imagetemplate="imagetemplate"
      />
    </div>
  </Suspense>
</template>
