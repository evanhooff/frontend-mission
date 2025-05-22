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
    :ui="{ root: 'bg-gray-200 border border-gray-100', header: 'p-0 py-2 sm:p-0 sm:py-2', footer: 'p-0 sm:p-0 max-h-[2rem]', body: 'p-0 sm:p-0 w-full bg-white grow flex flex-col justify-center' }"
  >
    <template #header>
      <span class="text-gray-900">
        {{ props.item.name }}
      </span>
    </template>
    <div class="w-full">
      <GridImage :item="item" :imagetemplate="imagetemplate" />
    </div>

    <template #footer>
      <div class="text-right h-full">
        <UButton no-prefetch :to="{ path: `/${universe}/${props.item.id || props.item.name}`, query: { url: props.item.url } }" label="Details" variant="link" class="h-full" color="neutral" />
      </div>
    </template>
  </UCard>
</template>
