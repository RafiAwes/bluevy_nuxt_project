<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const title = computed(() => props.error.statusCode === 404 ? 'Page not found' : 'Something went wrong')

useSeoMeta({
  title,
  description: () => props.error.statusMessage ?? title.value,
  robots: 'noindex',
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <main class="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p class="text-7xl font-bold text-emerald-600">{{ error.statusCode }}</p>
      <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
      <p v-if="error.statusMessage" class="text-gray-600">{{ error.statusMessage }}</p>
      <button
        type="button"
        class="mt-4 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
        @click="handleError"
      >
        Back to Home
      </button>
    </main>
  </NuxtLayout>
</template>
