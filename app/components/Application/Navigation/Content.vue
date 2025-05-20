<script setup lang="ts">
const { data: settings } = await useAsyncData(() => {
  return queryCollection('settings').all()
})
</script>

<template>
  <nav>
    <ul>
      <li v-for="(item, index) in settings" :key="index">
        <UButton :to="`/${item.universe}`" :label="item.universe" variant="ghost" />
      </li>
    </ul>
  </nav>
</template>
