<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const classes = computed(() =>
  props.variant === 'primary'
    ? 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-600'
    : 'bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-600',
)
</script>

<template>
  <button
    type="button"
    class="rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="classes"
  >
    <slot />
  </button>
</template>
