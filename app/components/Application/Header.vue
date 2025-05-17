<script setup lang="ts">
</script>

<template>
  <header class="z-10 shadow-xl shadow-neutral-500/10 dark:shadow-neutral-950/50 fixed flex items-center left-0 right-0 top-0 bg-neutral-100 dark:bg-neutral-900 border-b border-b-neutral-100 dark:border-b-neutral-800 h-[var(--application-header-height)]">
    <UContainer class="flex items-center h-20 w-full">
      <!-- For SEO purposes, a <h1> for page content is far more important and preferred than using <h1> for site branding. -->
      <h1 aria-hidden="true">
        Branding header
      </h1>
      <ApplicationNavigationContent aria-label="Primary" />
      <div class="ml-auto flex gap-2">
        <UButton to="https://github.com/spend-cloud-tom/front-end-boilerplate" icon="mdi:github" label="GitHub repository" variant="outline" />
        <ApplicationColorMode />
      </div>
    </UContainer>
  </header>
</template>
