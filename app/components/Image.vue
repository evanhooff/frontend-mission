<script setup lang="ts">
import type { imageProps } from '~/composables/useImageTemplate'
import { useImageTemplate } from '~/composables/useImageTemplate'

const props = defineProps<imageProps>()

const imageTemplate = computed(() => {
  return useImageTemplate({ item: props.item, imagetemplate: props.imagetemplate })
})
</script>

<template>
  <ClientOnly>
    <div class="max-h-10 max-w-10 aspect-ratio-1/1">
      <img class="contain w-full" :src="imageTemplate || ''" alt="Image" :loading="props.item.name">
    </div>
  </ClientOnly>
</template>
