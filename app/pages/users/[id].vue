<script setup lang="ts">
import type { UserResponse } from '~~/shared/types/user'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { data, error } = await useFetch<UserResponse>(() => `/api/users/${id.value}`)

const user = computed(() => data.value?.user)
const source = computed(() => data.value?.source ?? 'github')

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.statusMessage ?? 'Failed to load user',
    fatal: true,
  })
}

const displayName = computed(() => user.value?.name ?? user.value?.login ?? 'User')

usePageSeo({
  title: displayName,
  description: () => user.value?.bio ?? `${displayName.value} on GitHub — ${user.value?.public_repos ?? 0} public repositories.`,
  image: () => user.value?.avatar_url ?? undefined,
})

const joined = computed(() =>
  user.value ? new Date(user.value.created_at).toLocaleDateString('en-US', { dateStyle: 'long' }) : '',
)

const stats = computed(() => [
  { label: 'Repositories', value: user.value?.public_repos ?? 0 },
  { label: 'Followers', value: user.value?.followers ?? 0 },
  { label: 'Following', value: user.value?.following ?? 0 },
])
</script>

<template>
  <main class="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
    <NuxtLink to="/users" class="text-sm font-medium text-emerald-600 hover:text-emerald-700">
      &larr; All users
    </NuxtLink>

    <DataSourceNotice :source="source" />

    <article v-if="user" class="mt-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div class="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <UserAvatar :src="user.avatar_url" :name="displayName" size="lg" />
        <div class="min-w-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ displayName }}</h1>
          <a
            v-if="user.html_url"
            :href="user.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-500 hover:text-emerald-600"
          >
            @{{ user.login }}
          </a>
          <p v-else class="text-gray-500">@{{ user.login }}</p>
          <p v-if="user.bio" class="mt-2 text-gray-700">{{ user.bio }}</p>
        </div>
      </div>

      <dl class="mt-8 grid grid-cols-3 divide-x divide-gray-200 rounded-lg bg-gray-50 text-center">
        <div v-for="stat in stats" :key="stat.label" class="px-4 py-4">
          <dt class="text-xs font-medium uppercase tracking-wide text-gray-500">{{ stat.label }}</dt>
          <dd class="mt-1 text-2xl font-bold text-gray-900">{{ stat.value.toLocaleString() }}</dd>
        </div>
      </dl>

      <dl class="mt-8 grid gap-6 sm:grid-cols-2">
        <div v-if="user.company">
          <dt class="text-sm font-medium text-gray-500">Company</dt>
          <dd class="mt-1 text-gray-900">{{ user.company }}</dd>
        </div>
        <div v-if="user.location">
          <dt class="text-sm font-medium text-gray-500">Location</dt>
          <dd class="mt-1 text-gray-900">{{ user.location }}</dd>
        </div>
        <div v-if="user.blog">
          <dt class="text-sm font-medium text-gray-500">Website</dt>
          <dd class="mt-1">
            <a :href="user.blog.startsWith('http') ? user.blog : `https://${user.blog}`" target="_blank" rel="noopener noreferrer" class="text-emerald-600 hover:underline">
              {{ user.blog }}
            </a>
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Joined</dt>
          <dd class="mt-1 text-gray-900">{{ joined }}</dd>
        </div>
      </dl>
    </article>
  </main>
</template>
