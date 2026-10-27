import type { Spring } from "~/types/spring";
import springs from "~/server/data/springs.json";

export default defineCachedEventHandler(
  (event) => {
    const query = getQuery(event);

    let results = springs as Spring[];

    if (query.region && typeof query.region === "string") {
      results = results.filter(
        (s) =>
          s.location.region.toLowerCase() ===
          query.region!.toString().toLowerCase()
      );
    }

    if (query.type && typeof query.type === "string") {
      results = results.filter((s) => s.type === query.type);
    }

    if (query.search && typeof query.search === "string") {
      const term = query.search.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term)
      );
    }

    return results;
  },
  {
    maxAge: 60 * 60, // 1 hour
    varies: ["x-query"],
  }
);
