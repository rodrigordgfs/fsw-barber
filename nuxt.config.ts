import path from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  alias: {
    "@": path.resolve(__dirname, "./"),
    "~": path.resolve(__dirname, "./"),
  },
  app: {
    head: {
      title: "FSW Barber",
    },
  },
  modules: [
    "nuxt-icon",
    // "@nuxtjs/supabase",
    "@pinia/nuxt",
    // "@vite-pwa/nuxt"
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // runtimeConfig: {
  //   public: {
  //     bucketUrl: process.env.BUCKET_URL,
  //   },
  // },
  // supabase: { redirect: false },
});
