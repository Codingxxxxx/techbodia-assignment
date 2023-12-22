import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePaginationStore = defineStore('pagination', () => {
  const state = reactive({
    currentPage: 0,
    limit: 0,
    data: [],
    paginationList: [],
    totalPage: 0,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false,
    ready: false
  })

  const actions = {
    init(currentPage, limit, data) {  
      state.currentPage = currentPage
      state.limit = limit
      state.data = data
      state.paginationList = actions.getPaginationList()
      state.totalPage = actions.getTotalPage()
      state.totalCount = actions.getTotalCount()
      state.hasNext = actions.hasNext()
      state.hasPrevious = actions.hasPrevious()
      state.ready = true
    },
    getTotalCount: () => {
      return state.data.length
    },
    getPaginationList: () => {
      const offset = actions.calculateOffset()
      return state.data.slice(offset, state.limit + offset)
    },
    getCurrentPage:() => {
      return state.currentPage
    },
    hasPrevious: () => {
      return state.currentPage !== 1
    },
    hasNext: () => {
      return state.currentPage !== actions.getTotalPage()
    },
    calculateOffset: () => {
      return (state.currentPage - 1) * state.limit
    },
    getTotalPage: () => {
      return Math.ceil(actions.getTotalCount() / state.limit);
    }
  }

  return { state, actions }
})
