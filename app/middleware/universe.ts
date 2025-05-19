import { useUniverseStore } from '~/stores/universe'

function updateColorMode(page: string) {
  // color mode for layout related things
  const colorMode = useColorMode()
  colorMode.preference = page

  // style.css for color definition
  // import(`@/assets/css/${page}.css`)
}

function updateUniverseStore(page: string) {
  const universeStore = useUniverseStore()
  universeStore.setCurrentUniverse(page)
  universeStore.fetchUniverseItems(page)
}

export default defineNuxtRouteMiddleware((to) => {
  const { page } = to.params
  updateUniverseStore(page)
  updateColorMode(page)
})
