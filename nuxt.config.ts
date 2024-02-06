import path from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  alias: {
    "@": path.resolve(__dirname, "./"),
    "~": path.resolve(__dirname, "./"),
  },
  modules: [
    "nuxt-icon",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    "@nuxt/image",
    "@samk-dev/nuxt-vcalendar",
    "dayjs-nuxt",
  ],
  dayjs: {
    locales: ["pt-br"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "pt-br",
    defaultTimezone: "America/Sao_Paulo",
  },
  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKET_URL,
    },
  },
  supabase: { redirect: false },
  app: {
    head: {
      title: "FSW Barber",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
