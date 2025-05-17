import { useUniverseStore } from '~/stores/universe'

export default defineNuxtRouteMiddleware((to) => {
  const { page } = to.params
  const universeStore = useUniverseStore()
  universeStore.setCurrentUniverse(page)

  const colorMode = useColorMode()
  colorMode.preference = page
})
