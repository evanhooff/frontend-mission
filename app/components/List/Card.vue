<script setup lang="ts">
const props = defineProps<{
  universe: string
  item: any
  imagetemplate: string
}>()
</script>

<template>
  <div class="flex items-start justify-center w-full border border-green-300 align-baseline-safe p-2">
    <div class="mr-2">
      <ListAvatar :item="props.item" :imagetemplate="props.imagetemplate" />
    </div>
    <div class="grow my-1">
      {{ item.name }}
    </div>

    <!-- TODO: make the link generic -->
    <UButton no-prefetch :to="{ path: `/${universe}/${props.item.id || props.item.name}`, query: { url: props.item.url } }" :label="props.item.name" variant="ghost" />
  </div>
</template>
