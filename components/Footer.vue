<template>
  <div class="bg-zinc-900 h-16 w-full mt-24 flex items-center justify-center">
    <ClientOnly>
      <p class="text-xs text-zinc-400">
        © {{ currentYear }} Copyright -
        <span class="font-bold">ShinodaLabs</span>
      </p>
    </ClientOnly>
  </div>
</template>

<script setup>
import moment from "moment";

const currentYear = computed(() => {
  return moment().year();
});
</script>

<style></style>
