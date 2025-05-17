<script setup lang="ts">
const { data: navigation } = await useAsyncData('content', () => queryCollectionNavigation('content'))
</script>

<template>
  <nav>
    <ul>
      <li>
        <ApplicationNavigationLink
          v-for="(item, index) in navigation"
          :key="index"
          :to="item.path"
          :label="item.title"
        />
      </li>
    </ul>
  </nav>
</template>
