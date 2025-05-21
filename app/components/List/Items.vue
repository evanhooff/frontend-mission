<script setup lang="ts">
import type { VariantProps } from 'tailwind-variants'
import { ClientOnly } from '#components'
import { useUniverseStore } from '@/stores/universe'
import { tv } from 'tailwind-variants'
import { useLayoutSwitcher } from '~/composables/useLayoutSwitcher'

const store = useUniverseStore()
const { getCurrentUniverse: universe, getItemsPerUniverse: getItems, getCurrentUniverseSettings: settings } = storeToRefs(store)

const items = getItems.value(universe.value)

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

const cardVariant = computed(() =>
  ref(layoutVariant).value === 'list' ? 'subtle' : 'solid',
)
</script>

<template>
  <div>
    <ClientOnly>
      <div data-items="true" :class="listVariant.container()">
        <UCard
          v-for="item in items" :key="item.name"
          :variant="cardVariant"
          :ui="{ header: 'p-0 py-2 sm:p-0 sm:py-2', footer: 'p-0 sm:p-0 max-h-[2rem]', body: 'p-0 sm:p-0 w-full' }"
          :class="listVariant.content()"
        >
          <template #header>
            <span>
              {{ item.name }}
            </span>
          </template>
          <div class="w-full">
            <ListCardContent v-if="layoutVariant === 'list'" :item="item">
              <Image :item="item" :imagetemplate="imagetemplate" />
            </ListCardContent>
            <GridCardContent v-if="layoutVariant === 'grid'" :item="item">
              <Image :item="item" :imagetemplate="imagetemplate" />
            </GridCardContent>
          </div>

          <template #footer>
            <UButton no-prefetch :to="`/${universe}/${item.name}`" :label="item.name" variant="ghost" />
          </template>
        </UCard>

        <LayoutPagination />
      </div>
      <template #fallback>
        <!-- TODO: define skeleton -->
        <div class="text-center">
          loading ...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
