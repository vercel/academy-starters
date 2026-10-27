<script setup lang="ts">
const search = ref("");
const region = ref("");
const type = ref("");

const queryParams = computed(() => {
  const params: Record<string, string> = {};
  if (search.value) params.search = search.value;
  if (region.value) params.region = region.value;
  if (type.value) params.type = type.value;
  return params;
});

const { data: springs, status } = useFetch("/api/springs", {
  query: queryParams,
  transform: (data) =>
    data.map(({ id, name, description, location, temperature, type, elevation }) => ({
      id,
      name,
      description,
      location,
      temperature,
      type,
      elevation,
    })),
});

const regions = [
  "Pacific Northwest",
  "Rocky Mountains",
  "Southwest",
  "Northeast",
  "Iceland",
  "Japan",
  "New Zealand",
];

const types = ["wild", "developed", "resort"];
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-stone-900">
        Browse Hot Springs
      </h1>
      <p class="mt-1 text-stone-600">
        {{ springs?.length ?? 0 }} springs found
      </p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or description..."
        class="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
      />

      <select
        v-model="region"
        class="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
      >
        <option value="">All Regions</option>
        <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
      </select>

      <select
        v-model="type"
        class="rounded-lg border border-stone-300 px-3 py-2 text-sm capitalize focus:border-stone-500 focus:outline-none"
      >
        <option value="">All Types</option>
        <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
      </select>

      <button
        v-if="search || region || type"
        @click="search = ''; region = ''; type = ''"
        class="text-sm text-stone-500 hover:text-stone-700"
      >
        Clear filters
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="status === 'pending'" class="py-12 text-center text-stone-500">
      Loading springs...
    </div>

    <!-- Results -->
    <div v-else-if="springs?.length" class="grid gap-4 sm:grid-cols-2">
      <LazySpringCard v-for="spring in springs" :key="spring.id" :spring="spring" />
    </div>

    <!-- Empty state -->
    <div v-else class="py-12 text-center text-stone-500">
      No springs match your filters. Try broadening your search.
    </div>
  </div>
</template>
