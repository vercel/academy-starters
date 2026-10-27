import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-01",

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },
});
