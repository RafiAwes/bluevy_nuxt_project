export interface GitHubUserSummary {
  id: number
  login: string
  avatar_url: string | null
  html_url: string | null
  type: 'User' | 'Organization'
}

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

export type UserSource = 'github' | 'local'

export interface UsersResponse {
  source: UserSource
  query: string
  users: GitHubUserSummary[]
}

export interface UserResponse {
  source: UserSource
  user: GitHubUser
}
