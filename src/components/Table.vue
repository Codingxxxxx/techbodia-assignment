<script setup>
const props = defineProps({
  columns: Array,
  rows: Array,
  onCountryNameClicked: Function
})
</script>

<template>
  <table class="table table-light w-100">
    <thead>
      <tr>
        <th scope="col" class="text-nowrap" v-for="(column, idx) in props.columns" :key="idx">{{ column }}</th>
      </tr>
    </thead>
    <tbody v-if="rows.length > 0">
      <tr v-for="(row, idx) in rows" :key="idx">
        <td>
          <img class="border rounded" :src="row.flags.svg" :alt="row.name.official" width="64px" height="auto" />
        </td>
        <td class="text-nowrap">
          <a class="countryname" @click="props.onCountryNameClicked(row.cca2)">{{ row.name.official }}</a>
        </td>
        <td>{{ row.cca2 }}</td>
        <td>{{ row.cca3 }}</td>
        <td>
          <span v-if="row.name.nativeName && row.name.nativeName.eng">{{ row.name.nativeName.eng.official }}</span>
          <span v-else-if="row.name.nativeName">{{ row.name.nativeName[Object.keys(row.name.nativeName)[0]].official }}</span>
          <span class="text-danger" v-else>N/A</span>
        </td>
        <td>
          <span v-if="row.altSpellings[1]">{{ row.altSpellings[1] }}</span>
          <span class="text-danger" v-else>N/A</span>
        </td> 
        <td>
          <pre class="text-wrap">{{ (row.idd.suffixes ||  []).map(suffix => `${row.idd.root}${suffix}`).join(', ') }}</pre>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td class="text-danger text-center py-4" colspan="8">No results found!</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table > thead th {
  padding: 1rem 1rem;
  font-size: .875rem;
  font-weight: 600;
}

.countryname {
  text-decoration: underline;
  color: inherit;
}
.countryname:hover {
  color: var(--bs-primary);
  cursor: pointer;
}
</style>