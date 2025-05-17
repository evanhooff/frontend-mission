<script setup lang="ts">
const { path, params } = useRoute()
console.warn(path, params)
const universe = path
</script>

<template>
  <Suspense>
    <PageSection title="single item">
      {{ universe }}
    </PageSection>

    <!-- loading state via #fallback slot -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style>
  /* For the image container aspect ratio */
.pb-3\/4 {
  padding-bottom: 75%;
}
</style>
