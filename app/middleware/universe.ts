import { useUniverseStore } from '~/stores/universe'

function updateUniverseStore(page: string) {
  const universeStore = useUniverseStore()
  universeStore.setCurrentUniverse(page)
  universeStore.fetchUniverseItems(page)
}

export default defineNuxtRouteMiddleware((to) => {
  const { page } = to.params
  updateUniverseStore(page)
})
