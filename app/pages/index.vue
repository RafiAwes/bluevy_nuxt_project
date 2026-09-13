<script setup lang="ts">
const count = ref<number>(0)

useHead({
  title: 'Nuxt + Tailwind',
})
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
        Nuxt 4 <span class="text-emerald-600">+</span> Tailwind CSS v4
      </h1>
      <p class="mt-4 text-lg text-gray-600">
        TypeScript-powered starter. Edit
        <code class="rounded bg-gray-200 px-1.5 py-0.5 text-sm">app/pages/index.vue</code>
        to get started.
      </p>
    </div>

    <AppButton @click="count++">
      Clicked {{ count }} {{ count === 1 ? 'time' : 'times' }}
    </AppButton>
  </main>
</template>
