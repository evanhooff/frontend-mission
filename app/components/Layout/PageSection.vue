<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <section>
    <header>
      <h2>
        {{ props.title }}
      </h2>
    </header>
    <main>
      <slot />
    </main>
  </section>
</template>
