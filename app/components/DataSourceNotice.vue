<script setup lang="ts">
import type { UserSource } from '~~/shared/types/user'

defineProps<{ source: UserSource }>()
</script>

<template>
  <p
    v-if="source === 'local'"
    class="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
    role="status"
  >
    GitHub is currently unavailable (rate limit or network) — showing local sample data instead.
  </p>
</template>
