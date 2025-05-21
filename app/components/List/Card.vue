<script setup lang="ts">
const props = defineProps<{
  universe: string
  item: any
  imagetemplate: string
}>()
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <div>
      <ListAvatar :item="props.item" :imagetemplate="props.imagetemplate" />
    </div>
    <span>
      {{ item.name }}
    </span>

    <!-- TODO: make the link generic -->
    <UButton no-prefetch :to="{ path: `/${universe}/${props.item.id || props.item.name}`, query: { url: props.item.url } }" :label="props.item.name" variant="ghost" />
  </div>
</template>
