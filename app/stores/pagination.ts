import { defineStore } from 'pinia'

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    total: undefined as number | undefined,
    current: undefined as number | undefined,
  }),
  getters: {
    getTotal: state => state.total,
    getCurrentPage: state => state.current,

  },
  actions: {
    update({ total, current }: { total: number, current: number }) {
      this.total = total
      this.current = current
    },
  },
})
