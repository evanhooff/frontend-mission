<script setup lang="ts">
// import { getCurrentPage } from '@/helpers/pagination.helper'
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''

universeStore.fetchUniverseItems(universe)

// This registers the universe details under the 'universe' key.
const { data: details } = await useAsyncData(universe, () => {
  return queryCollection('universes')
    .where('stem', '=', `universes/${universe}`)
    .first()
})

// default layout, can be overridden by the page
definePageMeta({
  layout: 'list', // update this to use the composable
  middleware: 'universe',
})
</script>

<template>
  <UContainer>
    <header>
      <h1 class="text-2xl font-bold mb-4">
        {{ details?.title }}
      </h1>
      <LayoutSwitcher />
    </header>
    <main>
      <PageSection :title="`List of ${details?.label}`">
        <Suspense>
          <div>
            <ListItems />
          </div>
          <!-- loading state via #fallback slot -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </PageSection>
    </main>
  </UContainer>
</template>
