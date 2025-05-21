<script setup lang="ts">
import { useUniverseStore } from '~/stores/universe'

const store = useUniverseStore()
const { getCurrentUniverse: universe, getCurrentCharacterDetails: character } = storeToRefs(store)

definePageMeta({
  layout: 'single',
  middleware: 'character',
})
</script>

<template>
  <Suspense>
    <div>
      <h1>{{ character.name }}</h1>
      <div class="h-[20rem]">
        <!-- TODO: find out why object-contain object-center not working -->
        <img class="" :src="character.image || ''" alt="Image" :loading="character.name">
      </div>

      <main>
        <PageSection :title="`Details for ${character.name}`">
          <div v-for="(detail, index) in character.universe" :key="index">
            <strong>{{ index }}:</strong> {{ detail }}
          </div>
        </PageSection>
      </main>
    </div>

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
