<script setup lang="ts">
// import { getCurrentPage } from '@/helpers/pagination.helper'
import { useUniverseStore } from '@/stores/universe'

const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''

// This registers the universe details under the 'universe' key.
// const { data: details, status, error, refresh, clear } = await useAsyncData(universe, () => {
const { data: details } = await useAsyncData(universe, () => {
  return queryCollection('universes')
    .where('stem', '=', `universes/${universe}`)
    .first()
})

// default layout, can be overridden by the page
definePageMeta({
  layout: 'list',
  middleware: 'universe',
})
</script>

<template>
  <UContainer>
    <ApplicationBaseLayout>
      <template #header>
        <h1>{{ details?.title || undefined }}</h1>
      </template>
      <template #main>
        <PageSection :title="`List of ${details?.label}`">
          <Suspense>
            <ListItems />
            <!-- loading state via #fallback slot -->
            <template #fallback>
              Loading...
            </template>
          </Suspense>
        </PageSection>
      </template>
      <template #footer>
        <LayoutPagination />
      </template>
    </ApplicationBaseLayout>
  </UContainer>
</template>
