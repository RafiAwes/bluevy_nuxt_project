/** Shape returned by GET https://api.github.com/users (list items) */
export interface GitHubUserSummary {
  id: number
  login: string
  /** null for local fallback users — UI renders an initial instead */
  avatar_url: string | null
  html_url: string | null
  type: 'User' | 'Organization'
}

/** Shape returned by GET https://api.github.com/user/{id} (full profile) */
export interface GitHubUser extends GitHubUserSummary {
  name: string | null
  bio: string | null
  company: string | null
  location: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

/** Where the data came from — 'local' means GitHub was unavailable */
export type UserSource = 'github' | 'local'

export interface UsersResponse {
  source: UserSource
  /** The search term that produced these results ('' = default listing) */
  query: string
  users: GitHubUserSummary[]
}

export interface UserResponse {
  source: UserSource
  user: GitHubUser
}
