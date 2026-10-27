<script setup lang="ts">
const route = useRoute();

const { data: spring, error } = await useFetch(`/api/springs/${route.params.id}`);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Spring not found",
  });
}

const { loggedIn } = useUserSession();

const { data: userFavorites } = await useFetch("/api/user/favorites", {
  default: () => [],
});
const { data: userVisited } = await useFetch("/api/user/visited", {
  default: () => [],
});
const { data: reviews, refresh: refreshReviews } = await useFetch(
  `/api/springs/${route.params.id}/reviews`,
  { default: () => [] }
);

const isFavorite = computed(() =>
  userFavorites.value?.some((f: { springId: string }) => f.springId === spring.value?.id)
);
const isVisited = computed(() =>
  userVisited.value?.some((v: { springId: string }) => v.springId === spring.value?.id)
);

async function toggleFavorite() {
  if (!spring.value) return;
  await $fetch(`/api/user/favorites/${spring.value.id}`, {
    method: isFavorite.value ? "DELETE" : "POST",
  });
  userFavorites.value = await $fetch("/api/user/favorites");
}

async function toggleVisited() {
  if (!spring.value) return;
  await $fetch(`/api/user/visited/${spring.value.id}`, {
    method: isVisited.value ? "DELETE" : "POST",
  });
  userVisited.value = await $fetch("/api/user/visited");
}

const reviewBody = ref("");

async function submitReview() {
  if (!spring.value || !reviewBody.value.trim()) return;
  await $fetch(`/api/springs/${spring.value.id}/reviews`, {
    method: "POST",
    body: { body: reviewBody.value },
  });
  reviewBody.value = "";
  await refreshReviews();
}

const typeColors: Record<string, string> = {
  wild: "bg-emerald-100 text-emerald-800",
  developed: "bg-sky-100 text-sky-800",
  resort: "bg-amber-100 text-amber-800",
};
</script>

<template>
  <div v-if="spring" class="space-y-8">
    <!-- Back link -->
    <NuxtLink
      to="/springs"
      class="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700"
    >
      &larr; Back to all springs
    </NuxtLink>

    <!-- Header -->
    <div class="space-y-4">
      <div class="flex items-start justify-between">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900">
          {{ spring.name }}
        </h1>
        <span
          :class="typeColors[spring.type]"
          class="rounded-full px-3 py-1 text-xs font-medium capitalize"
        >
          {{ spring.type }}
        </span>
      </div>
      <p class="text-lg leading-relaxed text-stone-600">
        {{ spring.description }}
      </p>
    </div>

    <!-- Details grid -->
    <div class="grid gap-4 sm:grid-cols-3">
      <div class="rounded-lg border border-stone-200 bg-white p-4">
        <p class="text-xs font-medium uppercase tracking-wide text-stone-400">
          Location
        </p>
        <p class="mt-1 text-sm font-medium text-stone-900">
          {{ spring.location.region }}, {{ spring.location.country }}
        </p>
      </div>
      <div class="rounded-lg border border-stone-200 bg-white p-4">
        <p class="text-xs font-medium uppercase tracking-wide text-stone-400">
          Temperature
        </p>
        <p class="mt-1 text-sm font-medium text-stone-900">
          {{ spring.temperature.min }}–{{ spring.temperature.max }}°F
        </p>
      </div>
      <div class="rounded-lg border border-stone-200 bg-white p-4">
        <p class="text-xs font-medium uppercase tracking-wide text-stone-400">
          Elevation
        </p>
        <p class="mt-1 text-sm font-medium text-stone-900">
          {{ spring.elevation.toLocaleString() }} ft
        </p>
      </div>
    </div>

    <!-- Features -->
    <div>
      <h2 class="text-sm font-medium uppercase tracking-wide text-stone-400">
        Features
      </h2>
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="feature in spring.features"
          :key="feature"
          class="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
        >
          {{ feature }}
        </span>
      </div>
    </div>

    <!-- User actions (authenticated) -->
    <div v-if="loggedIn" class="flex gap-3">
      <button
        @click="toggleFavorite"
        class="rounded-lg border px-4 py-2 text-sm font-medium transition"
        :class="
          isFavorite
            ? 'border-rose-200 bg-rose-50 text-rose-700'
            : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
        "
      >
        {{ isFavorite ? "Remove from Favorites" : "Add to Favorites" }}
      </button>
      <button
        @click="toggleVisited"
        class="rounded-lg border px-4 py-2 text-sm font-medium transition"
        :class="
          isVisited
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
        "
      >
        {{ isVisited ? "Visited ✓" : "Mark as Visited" }}
      </button>
    </div>

    <!-- Reviews section -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-stone-900">Reviews</h2>

      <!-- Write a review (authenticated) -->
      <form v-if="loggedIn" @submit.prevent="submitReview" class="space-y-3">
        <textarea
          v-model="reviewBody"
          rows="3"
          placeholder="Share your experience at this spring..."
          class="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
        />
        <button
          type="submit"
          :disabled="!reviewBody.trim()"
          class="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
        >
          Submit Review
        </button>
      </form>

      <!-- Review list -->
      <div v-if="reviews?.length" class="space-y-3">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="rounded-lg border border-stone-200 bg-white p-4"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-stone-900">
              {{ review.author }}
            </span>
            <span class="text-xs text-stone-400">
              {{ new Date(review.createdAt).toLocaleDateString() }}
            </span>
          </div>
          <p class="mt-2 text-sm text-stone-600">{{ review.body }}</p>
        </div>
      </div>
      <p v-else class="text-sm text-stone-500">
        No reviews yet. Be the first to share your experience.
      </p>
    </div>
  </div>
</template>
