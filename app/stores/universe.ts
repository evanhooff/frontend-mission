import type { SettingsCollectionItem } from '@nuxt/content'
import { defineStore } from 'pinia'

interface ItemsPerUniverse {
  [key: string]: any[]
}

export const useUniverseStore = defineStore('universe', {
  state: () => ({
    pageSettings: [] as SettingsCollectionItem[],
    itemsPerUniverse: {} as ItemsPerUniverse,
    currentUniverse: '' as string,
  }),
  getters: {
    getCurrentUniverse: (state): string => {
      return state.currentUniverse || ''
    },
    getItemsPerUniverse: (state) => {
      return (universe: string): any[] => {
        const key = ref(universe)
        return state.itemsPerUniverse[key.value] || []
      }
    },
    getSettingsByUniverse: (state) => {
      return (universe: string): SettingsCollectionItem | undefined => {
        const key = ref(universe)
        return state.pageSettings.find(settings => settings.universe === key.value)
      }
    },
  },
  actions: {
    setCurrentUniverse(universe: string) {
      this.currentUniverse = universe
    },
    async storeUniverseSettings(settings: SettingsCollectionItem) {
      const universe = this.getSettingsByUniverse(settings.universe)
      if (universe) {
        return
      }
      return this.pageSettings.push(settings)
    },
    async storeItemsPerUniverse(universe: string, items: any[]) {
      // TODO: check length and push to the end if the universe already exists
      return this.itemsPerUniverse[universe] = items
    },
  },
})
