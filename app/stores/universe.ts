import { defineStore } from 'pinia'

interface pageSettings {
  universe: string
  endpoint: string
}

export const useUniverseStore = defineStore('universe', {
  state: () => ({
    pageSettings: [] as pageSettings[],
  }),
  getters: {
    getByUniverse: (state) => {
      return (universe: string) => state.pageSettings.find(settings => settings.universe === universe)
    },
  },
  actions: {
    async storeUniverseEndpoint(settings: pageSettings) {
      console.warn('storeUniverseEndpoint', settings)
      const universe = this.getByUniverse(settings.universe)
      if (!universe) {
        this.pageSettings.push(settings)
      }
    },
  },
})
