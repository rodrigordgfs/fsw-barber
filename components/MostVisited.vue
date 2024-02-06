<template>
  <div id="Hero" class="w-full h-full flex items-center justify-center">
    <div class="max-w-container w-full mt-10 flex flex-col gap-5 px-2">
      <div class="flex flex-row gap-3 items-center">
        <h2 class="text-white text-xl font-bold">Mais Visitados</h2>
        <button
          class="bg-transparent text-white font-normal text-sm hover:bg-zinc-700 transition-all py-1 px-2 rounded-lg"
        >
          Ver todos
        </button>
      </div>

      <div
        v-if="!useBarbershop.barbershopsByVisitsLoading"
        class="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <CardBarber
          v-for="barbershop in barbershops"
          :key="barbershop"
          :barbershop="barbershop"
        />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-3">
        <LoaderSkeleton
          v-for="index in 4"
          :key="index"
          width="271px"
          height="314px"
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
    await useBarbershop.getBarbershopsByVisits({ limit: 4 });
  } catch (error) {}
});

onMounted(() => {
  watchEffect(() => {
    barbershops.value = useBarbershop.barbershopsByVisits;
  });
});
</script>

<style></style>
