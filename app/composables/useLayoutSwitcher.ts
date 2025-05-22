import type { pageLayoutProps } from '~/components/List/Items.vue'

const defaultVariant = useLocalStorage<pageLayoutProps['variant']>('pageLayout', 'grid')

export const useLayoutSwitcher = computed<pageLayoutProps['variant']>({
  get: () => defaultVariant.value,
  set: (value) => {
    setPageLayout(value)
    defaultVariant.value = value
  },
})
