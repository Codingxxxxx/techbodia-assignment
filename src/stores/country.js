import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', () => {
  const state = reactive({
    source: [],
    countries: [],
    isFetching: true
  })

  const apiHost = import.meta.env.VITE_API_HOST 

  const actions = {
    async fetchData() {
      const res = await fetch(`${apiHost}/all`)
      state.source = await res.json()
      actions.search('', 'asc')
      state.isFetching = false
    },
    search(term, sort) {
      let results = []

      if (term) { 
        results = state.source.filter(country => {
          const searchRegex = new RegExp(term, 'ig')
          return searchRegex.test(country.name.official)
        })
      } else {
        results = [ ...state.source ]
      }

      // sort
      if (sort === 'asc') {
        state.countries = results.sort((a, b) => {
          return a.name.official.localeCompare(b.name.official)
        })
      } else {
        state.countries = results.sort((a, b) => {
          return b.name.official.localeCompare(a.name.official)
        })
      }
    }
  }

  actions.fetchData()

  return { state, actions }
})
