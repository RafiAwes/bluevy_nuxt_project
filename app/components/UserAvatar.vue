<script setup lang="ts">
interface Props {
  src: string | null
  name: string
  size?: 'sm' | 'lg'
}

const props = withDefaults(defineProps<Props>(), { size: 'sm' })

const sizeClass = computed(() => props.size === 'lg' ? 'size-24 text-3xl ring-4 ring-emerald-50' : 'size-12 text-lg')
const initial = computed(() => props.name.charAt(0).toUpperCase())
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="`${name} avatar`"
    loading="lazy"
    class="shrink-0 rounded-full bg-gray-100"
    :class="sizeClass"
  />
  <div
    v-else
    class="flex shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700"
    :class="sizeClass"
    aria-hidden="true"
  >
    {{ initial }}
  </div>
</template>
