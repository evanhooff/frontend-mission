<script setup lang="ts">
const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').all()
})
</script>

<template>
  <nav>
    <ul>
      <li>
        <ApplicationNavigationLink
          v-for="(item, index) in settings"
          :key="index"
          :to="`/${item.universe}`"
          :label="item.universe"
        />
      </li>
    </ul>
  </nav>
</template>
