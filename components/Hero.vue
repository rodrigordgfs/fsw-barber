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
        <InputSearchBarbershop
          v-if="!useBarbershop.recomendedBarbershopsLoading"
        />
        <LoaderSkeleton v-else class="mt-12" width="480px" height="36px" />
        <div v-if="!useReservations.lastReservationsLoading">
          <div v-if="hasReservation">
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
                  >
                    {{ reservationsStatus[reservation.status] }}
                  </span>
                </div>
                <p class="text-white text-lg font-bold mt-3">
                  {{ reservationServiceName }}
                </p>
                <div class="flex items-center flex-row gap-2 mt-2">
                  <NuxtImg
                    class="w-6 h-6 rounded-full shadow"
                    :src="
                      runtimeConfig.public.bucketUrl +
                      '/' +
                      reservationServiceImage
                    "
                  />
                  <p class="text-white font-normal text-sm">
                    {{ reservationBarbershopName }}
                  </p>
                </div>
              </div>
              <div
                class="ml-7 mr-4 text-white flex flex-col items-center justify-center font-normal"
              >
                <p class="text-xs">{{ reservationMonth }}</p>
                <p class="text-2xl">{{ reservationDay }}</p>
                <p class="text-xs">{{ reservation.time }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col mt-12">
          <LoaderSkeleton width="220px" height="20px" />
          <LoaderSkeleton class="mt-3" width="480px" height="122px" />
        </div>
      </div>
      <div class="w-1/2">
        <p
          v-if="!useBarbershop.recomendedBarbershopsLoading"
          class="uppercase font-bold text-sm text-zinc-400"
        >
          Recomendados
        </p>
        <LoaderSkeleton v-else class="mt-5" width="220px" height="20px" />
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

const reservationsStatus = {
  RESERVED: "Reservado",
  CONFIRMED: "Confirmado",
  CANCELED: "Cancelado",
  DONE: "Concluído",
};

const useUser = useSupabaseUser();
const useBarbershop = useBarbershopStore();
const useReservations = useReservationsStore();
const runtimeConfig = useRuntimeConfig();

const reservation = ref({});
const recomendedBarbershops = ref([]);

const isUserLoggedIn = computed(() => !!useUser.value);
const userFirstName = computed(
  () =>
    String(useUser.value.identities[0].identity_data.full_name).split(" ")[0]
);
const hasReservation = computed(() => {
  return isUserLoggedIn && reservation.value?.id;
});
const reservationMonth = computed(() => {
  return moment(reservation.value?.date).locale("pt-BR").format("MMMM");
});
const reservationDay = computed(() => {
  return moment(reservation.value?.date).locale("pt-BR").format("DD");
});
const reservationServiceName = computed(() => {
  return reservation.value?.service?.name;
});
const reservationServiceImage = computed(() => {
  return reservation.value?.service?.image;
});
const reservationBarbershopName = computed(() => {
  return reservation.value?.barbershop?.name;
});
const currentDate = computed(() => {
  return moment().locale("pt-br").format("dddd, D [de] MMMM");
});

onBeforeMount(async () => {
  try {
    useBarbershop.getAllRecomendedBarbershops();
    if (useUser.value) {
      useReservations.getUserReservations(useUser.value.id);
    }
  } catch (error) {
    console.log(error);
  }
});

onMounted(() => {
  watchEffect(() => {
    recomendedBarbershops.value = useBarbershop.recomendedBarbershops;
    reservation.value = useReservations.lastReservation;
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
