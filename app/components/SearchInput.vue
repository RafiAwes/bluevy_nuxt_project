<script setup lang="ts">
defineProps<{
  placeholder?: string
  loading?: boolean
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="relative">
    <svg
      class="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-gray-400"
      fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>

    <input
      v-model="model"
      type="search"
      :placeholder="placeholder"
      autocomplete="off"
      class="search-input w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-11 pr-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />

    <div class="absolute right-3 top-1/2 -translate-y-1/2">
      <svg
        v-if="loading"
        class="size-5 animate-spin text-emerald-600"
        fill="none" viewBox="0 0 24 24" aria-label="Loading"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
      </svg>
      <button
        v-else-if="model"
        type="button"
        class="rounded p-0.5 text-gray-400 hover:text-gray-600"
        aria-label="Clear search"
        @click="model = ''"
      >
        <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-input::-webkit-search-cancel-button {
  display: none;
}
</style>
