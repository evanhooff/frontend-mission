<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { defineProps } from 'vue'

defineProps({
  universe: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  imagetemplate: {
    type: String,
    required: true,
  },
})
const itemStyle = tv({
  slots: {
    item: 'flex w-full gap-4 place-content-between',
  },
  variants: {
    variant: {
      list: {
        item: 'w-full  text-left',
      },
      grid: {
        item: 'flex-col flex-wrap',
      },
    },
  },
})
const layoutVariant = ref(useLayoutSwitcher) || 'grid'

const itemVariant = computed(() =>
  itemStyle({
    variant: layoutVariant.value,
  }),
)

const ListCard = resolveComponent('List/Card')
const GridCard = resolveComponent('Grid/Card')
</script>

<template>
  <component
    :is="layoutVariant === 'list' ? ListCard : GridCard"
    :universe="universe"
    :item="item"
    :imagetemplate="imagetemplate"
    :class="itemVariant.item()"
  />
</template>
