<script setup lang="ts">
import type { Spring } from "~/types/spring";

definePageMeta({
  middleware: "auth",
});

const { data: favorites } = await useFetch("/api/user/favorites", {
  default: () => [],
});

const { data: allSprings } = await useFetch<Spring[]>("/api/springs", {
  default: () => [],
});

const favoriteSprings = computed(() => {
  const favoriteIds = new Set(
    favorites.value?.map((f: { springId: string }) => f.springId) ?? []
  );
  return allSprings.value?.filter((s) => favoriteIds.has(s.id)) ?? [];
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-stone-900">
        Your Favorites
      </h1>
      <p class="mt-1 text-stone-600">
        {{ favoriteSprings.length }} saved spring{{
          favoriteSprings.length === 1 ? "" : "s"
        }}
      </p>
    </div>

    <div v-if="favoriteSprings.length" class="grid gap-4 sm:grid-cols-2">
      <SpringCard
        v-for="spring in favoriteSprings"
        :key="spring.id"
        :spring="spring"
      />
    </div>

    <div v-else class="py-12 text-center">
      <p class="text-stone-500">
        No favorites yet. Browse springs and save the ones that catch your eye.
      </p>
      <NuxtLink
        to="/springs"
        class="mt-4 inline-block text-sm font-medium text-stone-700 hover:text-stone-900"
      >
        Browse Hot Springs &rarr;
      </NuxtLink>
    </div>
  </div>
</template>
