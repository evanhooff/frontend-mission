<script setup lang="ts">
import { PageSection } from '#components'
</script>

<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2 text-xl">
        <h1>
          Welcome to the home page! This is where you can start building your app.
        </h1>
      </header>
      <div>
        <PageSection title="Rick and Morty API response" />
        <PageSection title="Pokemon API response" />
      </div>
    </UContainer>
  </div>
</template>
