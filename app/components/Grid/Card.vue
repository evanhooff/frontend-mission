<script setup lang="ts">
const props = defineProps<{
  universe: string
  item: any
  imagetemplate: string
}>()
</script>

<template>
  <UCard
    :key="item.name"
    variant="solid"
    :ui="{ header: 'p-0 py-2 sm:p-0 sm:py-2', footer: 'p-0 sm:p-0 max-h-[2rem]', body: 'p-0 sm:p-0 w-full' }"
  >
    <template #header>
      <span>
        {{ props.item.name }}
      </span>
    </template>
    <div class="w-full">
      <GridImage :item="item" :imagetemplate="imagetemplate" />
    </div>

    <template #footer>
      <UButton no-prefetch :to="{ path: `/${universe}/${props.item.id || props.item.name}`, query: { url: props.item.url } }" :label="props.item.name" variant="ghost" />
    </template>
  </UCard>
</template>
