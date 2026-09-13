import type { GitHubUser, GitHubUserSummary, UsersResponse } from '~~/shared/types/user'

const MAX_QUERY_LENGTH = 100
const PER_PAGE = 30

function toSummary({ id, login, avatar_url, html_url, type }: GitHubUserSummary): GitHubUserSummary {
  return { id, login, avatar_url, html_url, type }
}

// Errors are never cached, so the fallback is dropped as soon as GitHub recovers
const fetchGitHubUsers = defineCachedFunction(
  async (q: string): Promise<GitHubUserSummary[]> => {
    if (q) {
      const res = await githubFetch<{ items: GitHubUserSummary[] }>('/search/users', { q, per_page: PER_PAGE })
      return res.items.map(toSummary)
    }
    const users = await githubFetch<GitHubUserSummary[]>('/users', { per_page: PER_PAGE })
    return users.map(toSummary)
  },
  { maxAge: 60 * 5, name: 'github-users', getKey: (q: string) => q || '__all__' },
)

function searchLocal(q: string): GitHubUserSummary[] {
  const term = q.toLowerCase()
  const matches = (u: GitHubUser) =>
    !term || u.login.toLowerCase().includes(term) || (u.name?.toLowerCase().includes(term) ?? false)
  return fallbackUsers.filter(matches).map(toSummary)
}

export default defineEventHandler(async (event): Promise<UsersResponse> => {
  const raw = getQuery(event).q
  const q = (typeof raw === 'string' ? raw : '').trim().slice(0, MAX_QUERY_LENGTH)

  try {
    return { source: 'github', query: q, users: await fetchGitHubUsers(q) }
  }
  catch (err) {
    console.warn('[users] GitHub unavailable, using local fallback:', (err as Error).message)
    return { source: 'local', query: q, users: searchLocal(q) }
  }
})
