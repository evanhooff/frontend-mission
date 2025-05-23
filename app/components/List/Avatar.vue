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
    <UAvatar
      :src="imageTemplate || ''"
      :alt="props.item.name"
      class="object-fill w-full"
    />
  </ClientOnly>
</template>
