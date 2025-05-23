import { useUniverseStore } from '~/stores/universe'

function updateColorMode(page: string) {
  const colorMode = useColorMode()
  colorMode.preference = page
}

function updateUniverseStore(page: string) {
  const universeStore = useUniverseStore()
  universeStore.setCurrentUniverse(page)
  universeStore.fetchUniverseItems(page)
}

export default defineNuxtRouteMiddleware((to) => {
  if ('universe' in to.params) {
    const { universe } = to.params
    updateUniverseStore(universe)
    updateColorMode(universe)
  }
})
