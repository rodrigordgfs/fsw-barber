<template>
  <div
    class="bg-zinc-900 h-16 w-full mt-24 flex flex-col items-center justify-center"
  >
    <ClientOnly>
      <p class="text-xs text-zinc-400">
        © {{ currentYear }} Copyright -
        <span class="font-bold">ShinodaLabs</span>
      </p>
      <div class="flex flex-row gap-2">
        <p
          @click="goToPolicyPrivacy"
          class="text-xs text-zinc-400 cursor-pointer"
        >
          Política de Privacidade
        </p>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import moment from "moment";

const router = useRouter();

const currentYear = computed(() => {
  return moment().year();
});

const goToPolicyPrivacy = () => {
  router.push("/policy-privacy");
};
</script>

<style></style>
