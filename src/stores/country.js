import { computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', () => {
  const state = reactive({
    countries: []
  })

  const apiHost = import.meta.env.VITE_API_HOST 

  const actions = {
    async fetchData() {
      const res = await fetch(`${apiHost}/all`)
      state.countries = await res.json()
    },
    sort(option) {
      if (option === 'asc') {
        state.countries = state.countries.sort((a, b) => {
          return a > b
        })
      } else {
        state.countries = state.countries.sort((a, b) => {
          return b > a
        })
      }
    }
  }

  actions.fetchData()

  return { state, actions }
})
