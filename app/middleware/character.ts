import { useUniverseStore } from '~/stores/universe'

function updateColorMode(page: string) {
  const colorMode = useColorMode()
  colorMode.preference = page
}

function updateUniverseStore(page: string, url: unknown) {
  const universeStore = useUniverseStore()
  universeStore.setCurrentUniverse(page)
  universeStore.fetchUniverseItems(page)
  universeStore.fetchCharacterDetails(url)
}
export default defineNuxtRouteMiddleware((to) => {
  console.warn('Middleware', to.query)
  if ('url' in to.query && 'universe' in to.params) {
    const { universe } = to.params
    const { url } = to.query
    updateUniverseStore(universe, url)
    updateColorMode(universe)
  }
})
