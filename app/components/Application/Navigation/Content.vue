<script setup lang="ts">
import { themeChange } from 'theme-change'

const { data: settings } = await useAsyncData(() => {
  return queryCollection('settings').all()
})
</script>

<template>
  <nav>
    <ul>
      <li v-for="(item, index) in settings" :key="index">
        <UButton
          :to="`/${item.universe}`" :label="item.universe" variant="ghost"
          :data-set-theme="item.css_colormode"
          @click="themeChange(false)"
        />
      </li>
    </ul>
  </nav>
</template>
