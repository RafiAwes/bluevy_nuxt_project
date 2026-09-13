export async function githubFetch<T>(path: string, query?: Record<string, string | number>): Promise<T> {
  const { githubToken } = useRuntimeConfig()

  try {
    return (await $fetch(path, {
      baseURL: 'https://api.github.com',
      query,
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'nuxt-app',
        ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
      },
    })) as T
  }
  catch (err: unknown) {
    const status = (err as { statusCode?: number }).statusCode

    if (status === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Not found on GitHub' })
    }
    if (status === 403 || status === 429) {
      throw createError({
        statusCode: 503,
        statusMessage: 'GitHub API rate limit exceeded. Add NUXT_GITHUB_TOKEN or try again later.',
      })
    }
    throw createError({ statusCode: 502, statusMessage: 'GitHub API request failed' })
  }
}
