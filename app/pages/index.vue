<script setup lang="ts">
const name = ref<string>('World')

useHead({
  title: 'Home',
})
</script>

<template>
  <main class="flex flex-1 flex-col items-center justify-center gap-6 px-6">
    <h1 class="text-5xl font-bold tracking-tight text-gray-900">
      Hello, <span class="text-emerald-600">{{ name }}</span>!
    </h1>

    <p class="text-lg text-gray-600">
      Welcome to your Nuxt 4 + Tailwind CSS project.
    </p>

    <input
      v-model="name"
      type="text"
      placeholder="Type your name"
      class="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  </main>
</template>
