<template>
  <div id="Hero" class="w-full h-full flex items-center justify-center">
    <div class="max-w-container w-full mt-10 flex flex-col gap-5 px-2">
      <div
        v-if="!useBarbershop.barbershopsHighlightsLoading"
        class="flex flex-row gap-3 items-center"
      >
        <h2 class="text-white text-xl font-bold">Destaques</h2>
        <button
          class="bg-transparent text-white font-normal text-sm hover:bg-zinc-700 transition-all py-1 px-2 rounded-lg"
        >
          Ver todos
        </button>
      </div>
      <div v-else class="flex flex-row gap-3">
        <LoaderSkeleton class="w-[98px] h-[28px]" />
        <LoaderSkeleton class="w-[76px] h-[28px]" />
      </div>

      <div
        v-if="!useBarbershop.barbershopsHighlightsLoading"
        class="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <CardBarber
          v-for="barbershop in barbershops"
          :key="barbershop"
          :barbershop="barbershop"
        />
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <LoaderSkeleton
          v-for="index in 4"
          :key="index"
          class="w-full md:w-[271px] h-[314px]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const useBarbershop = useBarbershopStore();
const barbershops = ref([]);

onBeforeMount(async () => {
  try {
    await useBarbershop.getBarbershopsHighlights({ limit: 4 });
  } catch (error) {}
});

onMounted(() => {
  watchEffect(() => {
    barbershops.value = useBarbershop.barbershopsHighlights;
  });
});
</script>

<style></style>
