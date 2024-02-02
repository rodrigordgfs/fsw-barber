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
const barbershops = ref([
  {
    id: 1,
    name: "Vintage Barber",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    rating: 4.5,
    image: "https://picsum.photos/id/223/200",
  },
  {
    id: 2,
    name: "Barbearia do Zé",
    address: "Rua das Rosas, 456",
    city: "São Paulo",
    state: "SP",
    rating: 4.8,
    image: "https://picsum.photos/id/222/200",
  },
  {
    id: 3,
    name: "Barbearia do João",
    address: "Rua das Margaridas, 789",
    city: "São Paulo",
    state: "SP",
    rating: 4.2,
    image: "https://picsum.photos/id/225/200",
  },
  {
    id: 1,
    name: "Vintage Barber",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    rating: 4.5,
    image: "https://picsum.photos/id/223/200",
  },
  {
    id: 2,
    name: "Barbearia do Zé",
    address: "Rua das Rosas, 456",
    city: "São Paulo",
    state: "SP",
    rating: 4.8,
    image: "https://picsum.photos/id/222/200",
  },
  {
    id: 3,
    name: "Barbearia do João",
    address: "Rua das Margaridas, 789",
    city: "São Paulo",
    state: "SP",
    rating: 4.2,
    image: "https://picsum.photos/id/225/200",
  },
  {
    id: 1,
    name: "Vintage Barber",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    rating: 4.5,
    image: "https://picsum.photos/id/223/200",
  },
  {
    id: 2,
    name: "Barbearia do Zé",
    address: "Rua das Rosas, 456",
    city: "São Paulo",
    state: "SP",
    rating: 4.8,
    image: "https://picsum.photos/id/222/200",
  },
]);
</script>

<style></style>
