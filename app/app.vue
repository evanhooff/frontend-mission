<script setup lang="ts">
import { useUniverseStore } from '@/stores/universe'
import { appName } from './constants'

// tried setting up as composable, but did not work
const { data: page } = await useAsyncData(() => {
  return queryCollection('settings').all()
})

// on nuxt init get all settings
const universeStore = useUniverseStore()
if (page && Array.isArray(page.value)) {
  page.value.forEach((settingsItem) => {
    universeStore.storeUniverseSettings(settingsItem)
  })
}

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <UApp>
    <NuxtLoadingIndicator />
    <ApplicationHeader />
    <NuxtLayout class="min-h-[calc(100vh-var(--application-header-height))] pt-[var(--application-header-height)] isolate">
      <NuxtPage />
    </NuxtLayout>
    <ApplicationFooter />
  </UApp>
</template>
