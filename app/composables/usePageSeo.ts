interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Absolute or site-relative image URL for social cards */
  image?: MaybeRefOrGetter<string | undefined>
}

/**
 * Sets the page title, description and social-card meta in one call.
 * Values can be plain strings, refs or getters so async data works.
 */
export function usePageSeo(options: PageSeoOptions) {
  const config = useRuntimeConfig()
  const route = useRoute()

  const canonical = computed(() => new URL(route.path, config.public.siteUrl).href)
  const ogImage = computed(() => {
    const img = toValue(options.image)
    return img ? new URL(img, config.public.siteUrl).href : undefined
  })

  useSeoMeta({
    title: () => toValue(options.title),
    description: () => toValue(options.description),
    ogTitle: () => toValue(options.title),
    ogDescription: () => toValue(options.description),
    ogUrl: () => canonical.value,
    ogImage: () => ogImage.value,
    twitterTitle: () => toValue(options.title),
    twitterDescription: () => toValue(options.description),
    twitterImage: () => ogImage.value,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })
}
