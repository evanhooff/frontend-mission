<script setup lang="ts">
const props = defineProps<{
  item: {
    [key: string]: any
  }
  imagetemplate: string | undefined
}>()

const imageTemplate = computed(() => {
  // regex is checking on ${} in the template and searching for it in the item
  return props.imagetemplate?.replace(/\$\{(.*?)\}/g, (_, match) => {
    return props.item?.[match] ?? ''
  })
})
</script>

<template>
  <ClientOnly>
    <div class="max-h-10 max-w-10 aspect-ratio-1/1">
      <img class="contain w-full" :src="imageTemplate || ''" alt="Image" :loading="props.item.name">
    </div>
  </ClientOnly>
</template>
