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
    <img :src="imageTemplate || ''" alt="Image">
  </ClientOnly>
</template>
