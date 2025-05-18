<script setup>
import { themeChange } from 'theme-change'

const colorMode = useColorMode()

const { data: universes } = await useAsyncData('universes', () => {
  return queryCollection('universes').all()
})

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="primary"
      variant="ghost"
      @click="isDark = !isDark"
    />
    <UButton
      v-for="(detail, index) in universes"
      :key="index"
      :label="detail.label"
      color="primary"
      variant="ghost"
      :data-set-theme="detail.universe"
      @click="themeChange(false)"
    >
      {{ detail.label }}
    </UButton>

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
