<script setup lang="ts">
const props = defineProps<{
  variant: 'list' | 'grid' | undefined
}>()
const cardVariant = computed(() =>
  ref(props.variant).value === 'list' ? 'subtle' : 'solid',
)
</script>

<template>
  <UCard :variant="cardVariant" :ui="{ header: 'p-0 py-2 sm:p-0 sm:py-2', footer: 'p-0 sm:p-0 max-h-[2rem]', body: 'p-0 sm:p-0' }">
    <template #header>
      <slot name="header" />
    </template>
    <slot name="content" />
    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
