<script setup lang="ts">
import type { Spring } from "~/types/spring";

const props = defineProps<{
  spring: Spring;
}>();

const temperatureLabel = computed(() => {
  return `${props.spring.temperature.min}–${props.spring.temperature.max}°F`;
});

const typeColors: Record<string, string> = {
  wild: "bg-emerald-100 text-emerald-800",
  developed: "bg-sky-100 text-sky-800",
  resort: "bg-amber-100 text-amber-800",
};
</script>

<template>
  <NuxtLink
    :to="`/springs/${spring.id}`"
    class="group block rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md"
  >
    <div class="space-y-3">
      <div class="flex items-start justify-between">
        <h3
          class="text-lg font-semibold text-stone-900 group-hover:text-stone-700"
        >
          {{ spring.name }}
        </h3>
        <span
          :class="typeColors[spring.type]"
          class="rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
        >
          {{ spring.type }}
        </span>
      </div>

      <p class="text-sm leading-relaxed text-stone-600">
        {{ spring.description.slice(0, 120) }}...
      </p>

      <div class="flex items-center gap-4 text-xs text-stone-500">
        <span>{{ spring.location.region }}, {{ spring.location.country }}</span>
        <span>{{ temperatureLabel }}</span>
        <span>{{ spring.elevation.toLocaleString() }} ft</span>
      </div>
    </div>
  </NuxtLink>
</template>
