<template>
  <div id="Search" class="w-full h-full flex items-center justify-center">
    <div
      class="max-w-container w-full pt-12 flex flex-col gap-10 border-t border-t-zinc-600"
    >
      <h1 class="text-white text-xl font-bold">
        Resultados para "{{ search }}"
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        <CardBarber
          v-if="!useBarbershop.barbershopsLoading"
          v-for="barbershop in barbershops"
          :key="barbershop"
          :barbershop="barbershop"
        />
        <LoaderSkeleton
          v-else
          v-for="index in 8"
          :key="index"
          width="100%"
          height="314px"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  name: "Search",
});

const useBarbershop = useBarbershopStore();
const route = useRoute();
const search = route.query.search;
const barbershops = ref([]);

onBeforeMount(async () => {
  try {
    await useBarbershop.getSearchBarbershops(search);
  } catch (error) {
    console.log(error);
  }
});

onMounted(() => {
  watchEffect(() => {
    barbershops.value = useBarbershop.barbershops;
  });
});
</script>

<style></style>
