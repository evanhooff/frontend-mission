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
    <template #default>
      <img class="contain w-full" :src="imageTemplate || ''" alt="Image" :loading="props.item.name">
    </template>
    <template #fallback>
      <div class="text-center">
        loading ...
      </div>
    </template>
  </ClientOnly>
</template>
