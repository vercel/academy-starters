import type { Spring } from "~/types/spring";
import springs from "~/server/data/springs.json";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const spring = (springs as Spring[]).find((s) => s.id === id);

  if (!spring) {
    throw createError({
      statusCode: 404,
      statusMessage: "Spring not found",
    });
  }

  return spring;
});
