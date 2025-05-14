<script setup lang="ts">
import { appName } from './constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <UApp>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <LayoutHeader />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
