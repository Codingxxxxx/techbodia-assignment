import { reactive } from 'vue'
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
      actions.sort('asc') // sort by asc by default
    },
    sort(option) {
      if (option === 'asc') {
        state.countries = [ ...state.countries ].sort((a, b) => {
          return a.name.official.localeCompare(b.name.official)
        })
      } else {
        state.countries = [ ...state.countries ].sort((a, b) => {
          return b.name.official.localeCompare(a.name.official)
        })
      }
    }
  }

  actions.fetchData()

  return { state, actions }
})
