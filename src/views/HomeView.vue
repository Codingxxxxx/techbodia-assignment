<script setup>
import { reactive, watchEffect, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'

import { useCountryStore } from '@/stores/country'
import { usePaginationStore } from '@/stores/pagination'

import { Modal } from 'bootstrap'

const countryStore = useCountryStore()
const paginationStore = usePaginationStore()
const route = useRoute()
const router = useRouter()

const state = reactive({
  currentPage: 0,
  limit: 25,
  searchTerm: '',
  searchBy: '',
  modalHandler: null,
  selectedCountry: null
})

const modalEle = ref(null)

watchEffect(() => {
  const pageParam = route.params.page
  const isInteger = !isNaN(pageParam) && Number.isInteger(Number(pageParam))
  state.currentPage = isInteger ? Number(pageParam) : 1
})

watchEffect(() => {
  paginationStore.actions.init(state.currentPage, state.limit, countryStore.state.countries)
})

watchEffect(() => {
  
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

const onCountryNameClicked = (cca2) => {
  state.selectedCountry = countryStore.state.countries.find(country => country.cca2 === cca2)
  state.modalHandler.show()
}

onMounted(() => {
  // init bootstrap modal
  state.modalHandler = new Modal(modalEle.value, {
    backdrop: 'static',
    keyboard: true
  })

  modalEle.value.addEventListener('hidden.bs.modal', () => {
    // reset selected country to null
    state.selectedCountry = null
  })
})
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
        <Table class="border" :columns="columns" :rows="paginationStore.state.paginationList" :on-country-name-clicked="onCountryNameClicked" />
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
  <div class="modal fade" tabindex="-1" ref="modalEle">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">Country Details</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="list-group list-group-flush" v-if="state.selectedCountry">
            <li class="list-group-item">
              <span>Country: </span>
              <span class="info">
                {{ state.selectedCountry.name.official }}
                <img class="ms-1" :src="state.selectedCountry.flags.svg" width="24px" height="auto">
              </span>
            </li>
            <li class="list-group-item">
              <span>Independent: </span>
              <span class="info">{{ state.selectedCountry.independent }}</span>
            </li>
            <li class="list-group-item">
              <span>Status: </span>
              <span class="info">{{ state.selectedCountry.status }}</span>
            </li>
            <li class="list-group-item">
              <span>UNMember: </span>
              <span class="info">{{ state.selectedCountry.unMember }}</span>
            </li>
            <li class="list-group-item">
              <span>Currencies: </span>
              <span v-if="state.selectedCountry.currencies" class="info">{{ Object.keys(state.selectedCountry.currencies).map(currencyCode => `${currencyCode}(${state.selectedCountry.currencies[currencyCode].symbol})`).join(', ') }}</span>
              <span v-else class="info text-danger">N/A</span>
            </li>
            <li class="list-group-item">
              <span>Capital: </span>
              <span v-if="state.selectedCountry.capital" class="info">{{ state.selectedCountry.capital.join(', ') }}</span>
              <span v-else class="info text-danger">N/A</span>
            </li>
            <li class="list-group-item">
              <span>Region: </span>
              <span class="info">{{ state.selectedCountry.region }}</span>
            </li>
            <li class="list-group-item">
              <span>Sub region: </span>
              <span class="info">{{ state.selectedCountry.subregion }}</span>
            </li>
            <li class="list-group-item">
              <span>Languages: </span>
              <span v-if="state.selectedCountry.languages" class="info">{{ Object.values(state.selectedCountry.languages).join(', ') }}</span>
              <span v-else class="info text-danger">N/A</span>
            </li>
            <li class="list-group-item">
              <span>Latlng: </span>
              <span class="info">{{ state.selectedCountry.latlng.join(', ') }}</span>
            </li>
            <li class="list-group-item">
              <span>Land locked: </span>
              <span class="info">{{ state.selectedCountry.landlocked }}</span>
            </li>
            <li class="list-group-item">
              <span>Area: {{ state.selectedCountry.area }}</span>
              <span class="info">{{ state.selectedCountry.area }}</span>
            </li>
            <li class="list-group-item">
              <span>Population: </span>
              <span class="info">{{ state.selectedCountry.population }}</span>
            </li>
            <li class="list-group-item">
              <span>Car: </span>
              <span class="info">
                side ({{ state.selectedCountry.car.side }})  
                {{ state.selectedCountry.car.signs && state.selectedCountry.car.signs.length > 0 ? 'and signs ' + state.selectedCountry.car.signs.join(', ') : '' }}</span>
            </li>
            <li class="list-group-item">
              <span>Timezones: </span>
              <span class="info">{{ state.selectedCountry.timezones.join(', ') }}</span>
            </li>
            <li class="list-group-item">
              <span>Continents: </span>
              <span class="info">{{ state.selectedCountry.continents.join(', ') }}</span>
            </li>
            <li class="list-group-item">
              <span>Start Of Week: </span>
              <span class="info">{{ state.selectedCountry.startOfWeek }}</span>
            </li>
            <li class="list-group-item">
              <span>Capital Info (latlng): </span>
              <span class="info">{{ state.selectedCountry.latlng.join(', ') }}</span>
            </li>
            <li class="list-group-item">
              <span>Postal Code: </span>
              <span class="info" v-if="state.selectedCountry.postalCode">format({{ state.selectedCountry.postalCode.format }}), regex({{ state.selectedCountry.postalCode.regex }})</span>
              <span class="info text-danger" v-else>N/A</span>
            </li>
            <li class="list-group-item">
              <span>Map (google): </span>
              <span class="info">
                <a href="{{ state.selectedCountry.maps.googleMaps }}">{{ state.selectedCountry.maps.googleMaps }}</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
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

.modal .modal-body {
  font-size: .875rem;
}

.list-group-item > span:not(.info) {
  font-weight: 600;
}

.info {
  color: var(--bs-gray-800);
}
</style>