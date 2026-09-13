/**
 * Returns a ref that mirrors `source` but only updates after `delay` ms of inactivity.
 * Useful for search inputs so each keystroke doesn't trigger a request.
 */
export function useDebouncedRef<T>(source: Ref<T>, delay = 300): Readonly<Ref<T>> {
  const debounced = ref(source.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | undefined

  watch(source, (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      debounced.value = value
    }, delay)
  })

  onScopeDispose(() => clearTimeout(timer))

  return readonly(debounced) as Readonly<Ref<T>>
}
