<script setup lang="ts">
import type { Spring } from "~/types/spring";

definePageMeta({
  middleware: "auth",
});

const { data: visited } = await useFetch("/api/user/visited", {
  default: () => [],
});

const { data: allSprings } = await useFetch<Spring[]>("/api/springs", {
  default: () => [],
});

const visitedSprings = computed(() => {
  const visitedIds = new Set(
    visited.value?.map((v: { springId: string }) => v.springId) ?? []
  );
  return allSprings.value?.filter((s) => visitedIds.has(s.id)) ?? [];
});

const stats = computed(() => {
  const springs = visitedSprings.value;
  if (!springs.length) return null;

  const regions = new Set(springs.map((s) => s.location.region));
  const types = springs.reduce(
    (acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    total: springs.length,
    regions: regions.size,
    hottest: Math.max(...springs.map((s) => s.temperature.max)),
    types,
  };
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-stone-900">
        Visited Springs
      </h1>
      <p class="mt-1 text-stone-600">
        {{ visitedSprings.length }} spring{{
          visitedSprings.length === 1 ? "" : "s"
        }}
        visited
      </p>
    </div>

    <!-- Stats -->
    <div
      v-if="stats"
      class="grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      <div class="rounded-lg border border-stone-200 bg-white p-4">
        <p class="text-2xl font-bold text-stone-900">{{ stats.total }}</p>
        <p class="text-xs text-stone-500">Springs Visited</p>
      </div>
      <div class="rounded-lg border border-stone-200 bg-white p-4">
        <p class="text-2xl font-bold text-stone-900">{{ stats.regions }}</p>
        <p class="text-xs text-stone-500">Regions</p>
      </div>
      <div class="rounded-lg border border-stone-200 bg-white p-4">
        <p class="text-2xl font-bold text-stone-900">{{ stats.hottest }}°F</p>
        <p class="text-xs text-stone-500">Hottest Visited</p>
      </div>
      <div class="rounded-lg border border-stone-200 bg-white p-4">
        <p class="text-2xl font-bold text-stone-900">
          {{ stats.types.wild || 0 }}
        </p>
        <p class="text-xs text-stone-500">Wild Springs</p>
      </div>
    </div>

    <div v-if="visitedSprings.length" class="grid gap-4 sm:grid-cols-2">
      <SpringCard
        v-for="spring in visitedSprings"
        :key="spring.id"
        :spring="spring"
      />
    </div>

    <div v-else class="py-12 text-center">
      <p class="text-stone-500">
        You haven't marked any springs as visited yet. Start exploring.
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
