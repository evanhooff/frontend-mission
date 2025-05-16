<script setup lang="ts">
// import { getCurrentPage } from '@/helpers/pagination.helper'
import { usePaginationStore } from '@/stores/pagination'
import { storeToRefs } from 'pinia'

const paginationStore = usePaginationStore()
const { total, current } = storeToRefs(paginationStore)
const limit = 20 // TODO: make dynamic
const page = ref(current)
</script>

<template>
  <UPagination v-model:page="page" :total="total" :items-per-page="limit" />
</template>
