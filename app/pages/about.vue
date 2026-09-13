<script setup lang="ts">
interface TechItem {
  name: string
  description: string
}

const stack: TechItem[] = [
  { name: 'Nuxt 4', description: 'Vue meta-framework with file-based routing, SSR and auto-imports.' },
  { name: 'TypeScript', description: 'Strict typing across components, composables and pages.' },
  { name: 'Tailwind CSS v4', description: 'Utility-first styling via the official Vite plugin.' },
]

useHead({
  title: 'About',
})
</script>

<template>
  <main class="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900">About</h1>
    <p class="mt-4 max-w-2xl text-lg text-gray-600">
      A minimal starter project demonstrating Nuxt 4 with TypeScript and Tailwind CSS.
      Pages live in <code class="rounded bg-gray-200 px-1.5 py-0.5 text-sm">app/pages/</code>
      and become routes automatically.
    </p>

    <h2 class="mt-12 text-2xl font-semibold text-gray-900">Tech stack</h2>
    <ul class="mt-6 grid gap-4 sm:grid-cols-3">
      <li
        v-for="item in stack"
        :key="item.name"
        class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <h3 class="font-semibold text-emerald-700">{{ item.name }}</h3>
        <p class="mt-2 text-sm text-gray-600">{{ item.description }}</p>
      </li>
    </ul>

    <NuxtLink
      to="/"
      class="mt-12 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
    >
      &larr; Back to Home
    </NuxtLink>
  </main>
</template>
