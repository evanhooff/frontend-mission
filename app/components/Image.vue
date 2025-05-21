<script setup lang="ts">
import type { imageProps } from '~/composables/useImageTemplate'
import { useImageTemplate } from '~/composables/useImageTemplate'

const props = defineProps<imageProps>()

const imageTemplate = computed(() => {
  return useImageTemplate({ item: props.item, imagetemplate: props.imagetemplate })
})
</script>

<template>
  <!-- <ClientOnly> -->
  <ClientOnly>
    <template #default>
      <NuxtImg
        v-slot="{ src, isLoaded, imgAttrs }"
        :src="imageTemplate || ''"
        alt="image"
        width="400"
        height="400"
        :custom="true"
      >
        <img
          v-if="isLoaded"
          v-bind="imgAttrs"
          :src="src"
        >

        <img
          v-else
          src="https://placehold.co/400x400"
          alt="placeholder"
        >
      </NuxtImg>
    </template>
    <template #fallback>
      <div class="text-center">
        loading ...
      </div>
    </template>
  </ClientOnly>

  <!-- <img class="contain w-full" :src="imageTemplate || ''" alt="Image" :loading="props.item.name">
  </ClientOnly> -->
</template>
