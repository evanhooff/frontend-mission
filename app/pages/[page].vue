<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'
// import { getCurrentPage } from '@/helpers/pagination.helper'
import { PageSection } from '#components'
import { useUniverseStore } from '@/stores/universe'

const { path } = useRoute()
const universeStore = useUniverseStore()
const universe = universeStore.getCurrentUniverse || ''

const { data: details } = await useAsyncData(path, () => {
  return queryCollection('content').path(`/universes/${universe}`).first()
})

// default layout, can be overridden by the page
definePageMeta({
  layout: 'list',
  middleware: 'universe',
})
</script>

<template>
  <ApplicationBaseLayout>
    <template #header>
      <h1>{{ details?.title || undefined }}</h1>
    </template>
    <template #main>
      <PageSection :title="`List of ${details?.label}`">
        <ListItems />
      </PageSection>
    </template>
    <template #footer>
      <LayoutPagination />
    </template>
  </ApplicationBaseLayout>
</template>
