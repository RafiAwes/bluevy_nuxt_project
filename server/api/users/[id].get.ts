import type { GitHubUser, UserResponse } from '~~/shared/types/user'

const fetchGitHubUser = defineCachedFunction(
  // GitHub supports lookup by numeric account id via /user/{id}
  (id: string) => githubFetch<GitHubUser>(`/user/${id}`),
  { maxAge: 60 * 5, name: 'github-user', getKey: (id: string) => id },
)

export default defineEventHandler(async (event): Promise<UserResponse> => {
  const id = getRouterParam(event, 'id')

  if (!id || !/^\d+$/.test(id)) {
    throw createError({ statusCode: 400, statusMessage: 'User id must be numeric' })
  }

  // Local users are always served locally — no point asking GitHub
  const local = fallbackUsers.find(u => u.id === Number(id))
  if (local) {
    return { source: 'local', user: local }
  }

  // GitHub errors (404, rate limit) propagate as-is — a GitHub id can't be
  // answered from local data.
  return { source: 'github', user: await fetchGitHubUser(id) }
})
