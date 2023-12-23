<script setup>
import { reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'

import { useCountryStore } from '@/stores/country'
import { usePaginationStore } from '@/stores/pagination'

const countryStore = useCountryStore()
const paginationStore = usePaginationStore()
const route = useRoute()
const router = useRouter()

const state = reactive({
  currentPage: 0,
  limit: 25,
  searchTerm: '',
  searchBy: ''
})

watchEffect(() => {
  const pageParam = route.params.page
  const isInteger = !isNaN(pageParam) && Number.isInteger(Number(pageParam))
  state.currentPage = isInteger ? Number(pageParam) : 1
})

watchEffect(() => {
  paginationStore.actions.init(state.currentPage, state.limit, countryStore.state.countries)
})

const columns = [
  'Flag', 
  'Country Name', 
  '2 Character Country Code', 
  '3 Character Country Code', 
  'Native Country Name', 
  'Alternative Country Name', 
  'Country Calling Codes'
]

const handleOrderBy = (evt) => {
  state.searchBy = evt.target.value;
  countryStore.actions.search(state.searchTerm, state.searchBy)
  router.push({ path: '/page/1' })
}

const handleSearch = (evt) => {
  state.searchTerm = evt.target.value
  countryStore.actions.search(state.searchTerm, state.searchBy)
  router.push('/page/1')
}
</script>

<template>
  <main class="vh-100">
    <div>
      <div class="p-3">
        <div class="d-flex mb-2">
          <!-- search box -->
          <div>
            <input id="search" placeholder="Search country..." class="form-control" @input="handleSearch">
          </div>
          <!-- order by -->
          <div id="orderByWrapper" class="input-group ms-auto">
            <span class="input-group-text">
              <i class="bi bi-sort-down"></i>
            </span>
            <select id="orderBy" class="form-select" @input="handleOrderBy">
              <option selected value="asc">ASC</option>
              <option value="des">DES</option>
            </select>
          </div>
        </div>
        <Table class="border" :columns="columns" :rows="paginationStore.state.paginationList" />
        <Pagination 
          v-if="paginationStore.state.ready"
          :current-page="paginationStore.state.currentPage"
          :total-page="paginationStore.state.totalPage"
          :has-next="paginationStore.state.hasNext"
          :has-previous="paginationStore.state.hasPrevious"
          />
      </div>
    </div>
  </main>
</template>

<style scoped>
#orderByWrapper {
  font-size: .875rrem;
  min-width: 60px;  
  width: auto;
}

#orderBy {
  font-size: .875rem;
}

#search {
  font-size: .875rem;
}
</style>