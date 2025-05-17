<script setup lang="ts">
import { appName } from './constants'

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
