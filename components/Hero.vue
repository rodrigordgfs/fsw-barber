<template>
  <div
    id="Hero"
    class="w-full h-full bg-zinc-800 flex items-center justify-center bg-hero-pattern bg-cover bg-no-repeat bg-center"
  >
    <div class="max-w-container w-full my-16 flex flex-row gap-20">
      <div class="flex-1">
        <ClientOnly>
          <p v-if="!isUserLoggedIn" class="text-white font-normal text-2xl">
            Olá, <span class="font-bold">Faça seu login</span>
          </p>
          <p v-else class="text-white font-normal text-2xl">
            Olá, <span class="font-bold">{{ userFirstName }}</span>
          </p>
          <p class="text-white font-normal text- mt-1">{{ currentDate }}</p>
          <template #fallback>
            <LoaderSkeleton width="220px" height="32px" />
            <LoaderSkeleton class="mt-1" width="300px" height="32px" />
          </template>
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

        <div v-if="hasScheduling">
          <p class="uppercase font-bold text-sm text-zinc-400 mt-12">
            Agendamentos
          </p>
          <div
            class="flex flex-row items-center rounded-lg border border-zinc-600 bg-zinc-800 p-3 mt-5 hover:bg-zinc-900 transition-all cursor-pointer"
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
      </div>
      <div class="w-1/2">
        <p class="uppercase font-bold text-sm text-zinc-400">Recomendados</p>
        <div class="w-full mt-5 flex flex-row">
          <Carousel
            v-if="!useBarbershop.recomendedBarbershopsLoading"
            :items-to-show="2.3"
            class="w-full"
          >
            <Slide
              v-for="barbershop in recomendedBarbershops"
              :key="barbershop"
            >
              <CardBarber :barbershop="barbershop" />
            </Slide>
            <template #addons>
              <Navigation />
              <Navigation />
            </template>
          </Carousel>
          <Carousel v-else :items-to-show="2.3" class="w-full">
            <Slide v-for="index in 5" :key="index">
              <LoaderSkeleton width="224px" height="314px" />
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
import { useBarbershopStore } from "~/stores/barbershop";

const useUser = useSupabaseUser();
const useBarbershop = useBarbershopStore();

const schedule = ref([]);
const recomendedBarbershops = ref([]);

const isUserLoggedIn = computed(() => !!useUser.value);
const userFirstName = computed(
  () =>
    String(useUser.value.identities[0].identity_data.full_name).split(" ")[0]
);
const hasScheduling = computed(
  () => isUserLoggedIn && schedule.value.length > 0
);

const currentDate = computed(() => {
  return moment().locale("pt-br").format("dddd, D [de] MMMM");
});

onBeforeMount(async () => {
  try {
    await useBarbershop.getAllRecomendedBarbershops();
  } catch (error) {
    console.log(error);
  }
});

onMounted(() => {
  watchEffect(() => {
    recomendedBarbershops.value = useBarbershop.recomendedBarbershops;
  });
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
