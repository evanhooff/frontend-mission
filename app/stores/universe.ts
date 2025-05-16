import { defineStore } from 'pinia'

interface pageSettings {
  universe: string
  endpoint: string
}

interface ItemsPerUniverse {
  [key: string]: any[]
}

export const useUniverseStore = defineStore('universe', {
  state: () => ({
    pageSettings: [] as pageSettings[],
    itemsPerUniverse: {} as ItemsPerUniverse,
  }),
  getters: {
    getItemsPerUniverse: (state) => {
      return (universe: string): any[] => {
        const key = ref(universe)
        return state.itemsPerUniverse[key.value] || []
      }
    },
    getByUniverse: (state) => {
      return (universe: string): pageSettings | undefined => {
        return state.pageSettings.find(settings => settings.universe === universe)
      }
    },
  },
  actions: {
    async storeUniverseEndpoint(settings: pageSettings) {
      const universe = this.getByUniverse(settings.universe)
      if (universe) {
        return
      }
      return this.pageSettings.push(settings)
    },
    async storeItemsPerUniverse(universe: string, items: any[]) {
      return this.itemsPerUniverse[universe] = items
    },
  },
})
