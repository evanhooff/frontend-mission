<!-- Page section is affected by layout -->
<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <section>
    <h2>
      {{ props.title }}
    </h2>
    <div class="content">
      <slot />
    </div>
  </section>
</template>
