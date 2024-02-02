<template>
  <div
    id="Hero"
    class="w-full h-full bg-zinc-800 flex items-center justify-center bg-hero-pattern bg-cover bg-no-repeat bg-center"
  >
    <div class="max-w-container w-full my-16 flex flex-row gap-20">
      <div class="flex-1">
        <p v-if="!isLogged" class="text-white font-normal text-2xl">
          Olá, <span class="font-bold">Faça seu login</span>
        </p>
        <p v-else class="text-white font-normal text-2xl">
          Olá, <span class="font-bold">Rodrigo</span>
        </p>
        <ClientOnly>
          <p class="text-white font-normal text- mt-1">{{ currentDate }}</p>
        </ClientOnly>

        <form @submit.prevent="" class="flex flex-row items-center gap-2 mt-12">
          <input
            class="w-full bg-zinc-900 border border-zinc-600 text-white text-sm h-9 outline-none py-2 px-3 rounded-lg"
            type="text"
            placeholder="Buscar Barbearias"
          />
          <button
            type="submit"
            class="flex items-center justify-center rounded-lg w-10 h-9 bg-purple-900 hover:bg-purple-800 transition-all"
          >
            <Icon name="ic:round-search" color="#FFF" size="24" />
          </button>
        </form>

        <p class="uppercase font-bold text-sm text-zinc-400 mt-12">
          Agendamentos
        </p>
        <div
          class="flex flex-row items-center rounded-lg border border-zinc-600 bg-zinc-900 p-3 mt-5 hover:bg-zinc-800 transition-all cursor-pointer"
        >
          <div class="flex-1 flex flex-col border-r border-r-zinc-600">
            <div>
              <span
                class="rounded-lg bg-purple-900 text-purple-300 font-bold text-xs px-2"
                >Confirmado
              </span>
            </div>
            <p class="text-white text-lg font-bold mt-3">Corte de Cabelo</p>
            <div class="flex items-center flex-row gap-2 mt-2">
              <img
                class="w-6 h-6 rounded-full shadow"
                src="https://picsum.photos/id/223/50"
              />
              <p class="text-white font-normal text-sm">Vintage Barber</p>
            </div>
          </div>
          <div
            class="ml-7 mr-4 text-white flex flex-col items-center justify-center font-normal"
          >
            <p class="text-xs">Fevereiro</p>
            <p class="text-2xl">06</p>
            <p class="text-xs">09:45</p>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <p class="uppercase font-bold text-sm text-zinc-400">Recomendados</p>
        <div class="w-full mt-5 flex flex-row">
          <Carousel :items-to-show="2.3" class="w-full">
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
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const isLogged = ref(false);

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
]);

const currentDate = computed(() => {
  return moment().locale("pt-br").format("dddd, D [de] MMMM");
});
</script>

<style>
.carousel__prev,
.carousel__next {
  border-radius: 50%;
  margin: 0 12px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #581c87 !important;
  color: #fff !important;
  border: 1px solid #fff !important;
  filter: drop-shadow(0px 15px 30px rgba(51, 51, 51, 0.2));
  box-shadow: 0px 15px 30px rgba(51, 51, 51, 0.2);
}
</style>
