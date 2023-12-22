<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  totalPage: Number,
  currentPage: Number,
  hasPrevious: Boolean,
  hasNext: Boolean
})
</script>

<template>
<nav class="d-flex justify-content-center" aria-label="table navigation">
  <ul class="pagination pagination-secondary mt-3">
    <li class="page-item" :class="{ 'disabled': !props.hasPrevious }">
      <RouterLink class="page-link" :to="'/page/' + (props.currentPage - 1)" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </RouterLink>
    </li>
    <li :class="{ 'active': props.currentPage === (idx + 1) }" v-for="(page, idx) in new Array(props.totalPage)" :key="idx" class="page-item">
      <RouterLink class="page-link" :to="'/page/' + (idx + 1)">{{ idx + 1 }}</RouterLink>
    </li>
    <li class="page-item" :class="{ 'disabled': !props.hasNext }">
      <RouterLink class="page-link" :to="'/page/' + (props.currentPage + 1)" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </RouterLink>
    </li>
  </ul>
</nav>
</template>