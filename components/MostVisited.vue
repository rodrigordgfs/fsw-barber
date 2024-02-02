<template>
  <div id="Hero" class="w-full h-full flex items-center justify-center">
    <div class="max-w-container w-full mt-10 flex flex-col gap-5">
      <h2 class="text-white text-xl font-bold">Mais Visitados</h2>

      <Carousel :items-to-show="4.6" class="w-full">
        <Slide v-for="barbershop in barbershops" :key="barbershop">
          <CardBarber :barbershop="barbershop" />
        </Slide>
        <template #addons>
          <Navigation />
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
const useBarbershop = useBarbershopStore();
const barbershops = ref([]);

onBeforeMount(async () => {
  try {
    await useBarbershop.getAllBarbershops();
  } catch (error) {}
});

onMounted(() => {
  watchEffect(() => {
    barbershops.value = useBarbershop.barbershops;
  });
});
</script>

<style></style>
