<script setup lang="ts">
const { loggedIn } = useUserSession();

// Redirect if already logged in
if (loggedIn.value) {
  navigateTo("/springs");
}

const route = useRoute();
const hasError = computed(() => route.query.error === "auth");
</script>

<template>
  <div class="mx-auto max-w-sm space-y-6 pt-12 text-center">
    <h1 class="text-2xl font-bold tracking-tight text-stone-900">Log In</h1>
    <p class="text-stone-600">
      Sign in with GitHub to save favorites, track visited springs, and leave
      reviews.
    </p>

    <p v-if="hasError" class="text-sm text-red-600">
      Something went wrong with authentication. Please try again.
    </p>

    <a
      href="/auth/github"
      class="inline-block rounded-lg bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-700"
    >
      Sign in with GitHub
    </a>
  </div>
</template>
