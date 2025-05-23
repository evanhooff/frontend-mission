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
      <img class="object-fill w-full" :src="imageTemplate || ''" alt="Image" :loading="props.item.name || ''">
      <!-- <NuxtImg
        provider="netlify"
        :src="imageTemplate || ''"
        height="400"
        width="600"
        fit="cover"
        quality="80"
        :modifiers="{ position: 'center' }"
      /> -->
    </template>
    <template #fallback>
      <div class="text-center">
        loading ...
      </div>
    </template>
  </ClientOnly>
</template>
