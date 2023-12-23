<script setup>
const props = defineProps({
  show: Boolean,
  loadingTitle: String
})
</script>

<template>
<div class="flex-column justify-content-center align-items-center" :class="{ 'd-none': !show, 'd-flex': show }">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <span class="spinner-title">{{ props.loadingTitle }}</span>
</div>
</template>

<style scoped>
.spinner-title {
  font-size: .825rem;
  color: var(--bs-gray-700);
}
</style>