<script setup lang="ts">
import type { UsersResponse } from '~~/shared/types/user'

const route = useRoute()
const router = useRouter()

// Search term: seeded from ?q= so links are shareable, debounced before fetching
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')
const debouncedSearch = useDebouncedRef(search, 350)

// Keep the URL in sync without adding history entries on every keystroke
watch(debouncedSearch, (q) => {
  router.replace({ query: q ? { q } : {} })
})

const { data, status, error } = await useFetch<UsersResponse>('/api/users', {
  query: { q: debouncedSearch },
})

const users = computed(() => data.value?.users ?? [])
const source = computed(() => data.value?.source ?? 'github')
const activeQuery = computed(() => data.value?.query ?? '')
const isSearching = computed(() => status.value === 'pending')

usePageSeo({
  title: () => activeQuery.value ? `Search: ${activeQuery.value}` : 'Users',
  description: () => activeQuery.value
    ? `${users.value.length} users matching "${activeQuery.value}".`
    : `Browse ${users.value.length} users and view their profiles.`,
})
</script>

<template>
  <main class="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900">Users</h1>
    <p class="mt-4 text-lg text-gray-600">
      Search users from the
      <a href="https://api.github.com/users" target="_blank" rel="noopener noreferrer" class="text-emerald-600 hover:underline">GitHub API</a>
      by username or name.
    </p>

    <SearchInput
      v-model="search"
      placeholder="Search users…"
      :loading="isSearching"
      class="mt-8"
    />

    <DataSourceNotice :source="source" />

    <div v-if="error" class="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
      {{ error.statusMessage ?? 'Failed to load users.' }}
    </div>

    <template v-else>
      <p class="mt-6 text-sm text-gray-500" aria-live="polite">
        <template v-if="activeQuery">
          {{ users.length }} {{ users.length === 1 ? 'result' : 'results' }} for
          <span class="font-medium text-gray-900">"{{ activeQuery }}"</span>
        </template>
        <template v-else>Showing {{ users.length }} users</template>
      </p>

      <div
        v-if="users.length === 0"
        class="mt-8 rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center"
      >
        <p class="font-medium text-gray-900">No users found</p>
        <p class="mt-1 text-sm text-gray-500">Try a different search term.</p>
        <button
          type="button"
          class="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          @click="search = ''"
        >
          Clear search
        </button>
      </div>

      <ul
        v-else
        class="mt-4 grid gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3"
        :class="{ 'opacity-50': isSearching }"
      >
        <li v-for="user in users" :key="user.id">
          <NuxtLink
            :to="`/users/${user.id}`"
            class="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50/40"
          >
            <UserAvatar :src="user.avatar_url" :name="user.login" />
            <div class="min-w-0">
              <p class="truncate font-semibold text-gray-900">{{ user.login }}</p>
              <p class="text-sm text-gray-500">#{{ user.id }} · {{ user.type }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </main>
</template>
