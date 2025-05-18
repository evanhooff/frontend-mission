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
    currentUniverseSettings: {} as SettingsCollectionItem,
  }),
  hydrate(state) {
    // in this case we can completely ignore the initial state since we
    // want to read the value from the browser
    state.currentUniverse = ''
  },
  getters: {
    getCurrentUniverse: (state): string => {
      return state.currentUniverse || ''
    },
    getCurrentUniverseSettings: (state): SettingsCollectionItem => {
      return state.currentUniverseSettings || {}
    },
    getSettingsByUniverse: (state) => {
      return (universe: string): SettingsCollectionItem | undefined => {
        const key = ref(universe)
        return state.pageSettings.find(settings => settings.universe === key.value)
      }
    },
    getItemsPerUniverse: (state) => {
      return (universe: string): any[] => {
        const key = ref(universe)
        return state.itemsPerUniverse[key.value] || []
      }
    },
  },
  actions: {
    setCurrentUniverse(universe: string) {
      this.currentUniverse = universe
      if (this.getSettingsByUniverse(universe)) {
        this.currentUniverseSettings = this.getSettingsByUniverse(universe) as SettingsCollectionItem
      }
    },
    async storeUniverseSettings(settings: SettingsCollectionItem) {
      const universe = this.getSettingsByUniverse(settings.universe)
      if (universe) {
        return
      }
      return this.pageSettings.push(settings)
    },
    async fetchUniverseItems(universe: string) {
      const availableItems = this.getItemsPerUniverse(universe)
      if (availableItems.length > 0) {
        // if items are already stored, do not fetch again
        return
      }
      if (this.getSettingsByUniverse(universe)) {
        const { endpoint, itemsProperty } = this.getSettingsByUniverse(universe) as SettingsCollectionItem
        const { data } = await useFetch(endpoint, {
          onResponseError() {
            throw new Error('Error fetching universe items')
          },
        })
        this.storeItemsPerUniverse(this.currentUniverse, data, itemsProperty)
      }
    },
    async storeItemsPerUniverse(universe: string, data: any, itemsProperty: string) {
      const items = data.value[itemsProperty]
      // TODO: check length and push to the end if the universe already exists
      return this.itemsPerUniverse[universe] = ref(items).value
    },
  },
})
