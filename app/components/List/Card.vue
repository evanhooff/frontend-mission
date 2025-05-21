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

    <UButton no-prefetch :to="`/${universe}/${props.item.id}`" :label="props.item.name" variant="ghost" />
  </div>
</template>
