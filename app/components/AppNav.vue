<script setup lang="ts">
interface NavLink {
  label: string
  to: string
}

const links: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <nav class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
      <NuxtLink to="/" class="text-lg font-bold tracking-tight text-gray-900">
        Nuxt<span class="text-emerald-600">App</span>
      </NuxtLink>

      <ul class="flex items-center gap-1">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            active-class="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
