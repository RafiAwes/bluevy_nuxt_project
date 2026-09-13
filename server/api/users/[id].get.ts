import type { GitHubUser, UserResponse } from '~~/shared/types/user'

const fetchGitHubUser = defineCachedFunction(
  // /user/{id} resolves a numeric account id (unlike /users/{login})
  (id: string) => githubFetch<GitHubUser>(`/user/${id}`),
  { maxAge: 60 * 5, name: 'github-user', getKey: (id: string) => id },
)

export default defineEventHandler(async (event): Promise<UserResponse> => {
  const id = getRouterParam(event, 'id')

  if (!id || !/^\d+$/.test(id)) {
    throw createError({ statusCode: 400, statusMessage: 'User id must be numeric' })
  }

  const local = fallbackUsers.find(u => u.id === Number(id))
  if (local) {
    return { source: 'local', user: local }
  }

  return { source: 'github', user: await fetchGitHubUser(id) }
})
