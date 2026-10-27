<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-900">
    <header class="border-b border-stone-200 bg-white">
      <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight text-stone-900">
          Hot Springs Finder
        </NuxtLink>
        <div class="flex items-center gap-6">
          <NuxtLink
            to="/springs"
            class="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            Browse
          </NuxtLink>
          <template v-if="loggedIn">
            <NuxtLink
              to="/favorites"
              class="text-sm font-medium text-stone-600 hover:text-stone-900"
            >
              Favorites
            </NuxtLink>
            <NuxtLink
              to="/visited"
              class="text-sm font-medium text-stone-600 hover:text-stone-900"
            >
              Visited
            </NuxtLink>
            <div class="flex items-center gap-3">
              <span class="text-sm text-stone-500">{{ user?.login }}</span>
              <button
                @click="clear"
                class="text-sm font-medium text-stone-600 hover:text-stone-900"
              >
                Log out
              </button>
            </div>
          </template>
          <NuxtLink
            v-else
            to="/login"
            class="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            Log in
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <slot />
    </main>

    <footer class="border-t border-stone-200 py-8 text-center text-sm text-stone-400">
      Hot Springs Finder &mdash; Built with Nuxt
    </footer>
  </div>
</template>
