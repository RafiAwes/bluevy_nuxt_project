<script setup lang="ts">
interface NavLink {
  label: string
  to: string
}

const links: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Users', to: '/users' },
  { label: 'About', to: '/about' },
]

const mobileOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
    <nav class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
      <NuxtLink to="/" class="text-lg font-bold tracking-tight text-gray-900">
        Nuxt<span class="text-emerald-600">App</span>
      </NuxtLink>

      <ul class="hidden items-center gap-1 sm:flex">
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

      <button
        type="button"
        class="rounded-md p-2 text-gray-600 hover:bg-gray-100 sm:hidden"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
        @click="mobileOpen = !mobileOpen"
      >
        <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <ul v-if="mobileOpen" id="mobile-menu" class="space-y-1 border-t border-gray-200 px-4 py-3 sm:hidden">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </header>
</template>
