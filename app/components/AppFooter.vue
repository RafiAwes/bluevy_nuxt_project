<script setup lang="ts">
const year = new Date().getFullYear()

const footerLinks = [
  { label: 'Nuxt', href: 'https://nuxt.com' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { label: 'Vue', href: 'https://vuejs.org' },
]
</script>

<template>
  <footer class="border-t border-gray-200 bg-white">
    <div class="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
      <p class="text-sm text-gray-500">
        &copy; {{ year }} Nuxt<span class="text-emerald-600">App</span>. Built with Nuxt 4 &amp; Tailwind CSS.
      </p>

      <ul class="flex items-center gap-6">
        <li v-for="link in footerLinks" :key="link.href">
          <a
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
