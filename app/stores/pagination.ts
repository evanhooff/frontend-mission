import { defineStore } from 'pinia'

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    total: undefined,
    current: undefined,
  }),
  getters: {
    getTotal: state => state.total,
    getCurrentPage: state => state.current,

  },
  actions: {
    update({ total, current }) {
      console.warn('update pagination store', { total, current })
      this.total = total
      this.current = current
    },
  },
})
