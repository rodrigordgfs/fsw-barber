<template>
  <div
    id="Hero"
    class="w-full h-full bg-zinc-800 flex items-center justify-center bg-hero-pattern bg-cover bg-no-repeat bg-center"
  >
    <div class="max-w-container w-full my-16 flex flex-row gap-20 px-2">
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
            <p class="uppercase font-bold text-sm text-zinc-400 mt-12 mb-5">
              Agendamentos
            </p>
            <CardReservation
              :reservation="reservation"
              @click="router.push('/reservations')"
            />
          </div>
        </div>
        <div v-else class="flex flex-col mt-12">
          <LoaderSkeleton width="220px" height="20px" />
          <LoaderSkeleton class="mt-3" width="480px" height="122px" />
        </div>
      </div>
      <div class="hidden md:block md:w-1/2">
        <p
          v-if="!useBarbershop.recomendedBarbershopsLoading"
          class="uppercase font-bold text-sm text-zinc-400"
        >
          Recomendados
        </p>
        <LoaderSkeleton v-else class="mt-5" width="220px" height="20px" />
        <div class="w-full mt-5 flex flex-row overflow-x-auto">
          <div
            class="flex flex-row whitespace-nowrap gap-4 pb-3 scroll-container-times"
          >
            <CardBarber
              v-if="!useBarbershop.recomendedBarbershopsLoading"
              class="flex-shrink-0 w-full max-w-[269px]"
              v-for="barbershop in recomendedBarbershops"
              :barbershop="barbershop"
            />
            <LoaderSkeleton
              v-for="index in 2"
              :key="index"
              width="269px"
              height="293px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const useUser = useSupabaseUser();
const router = useRouter();
const useBarbershop = useBarbershopStore();
const useReservations = useReservationsStore();

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
const currentDate = computed(() => {
  return dayjs()
    .format("dddd, D [de] MMMM")
    .replace(/^\w/, (char) => char.toUpperCase());
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
.scroll-container-times {
  overflow-x: scroll;
  overflow-y: hidden;
}

.scroll-container-times::-webkit-scrollbar {
  height: 10px;
}

.scroll-container-times::-webkit-scrollbar-track {
  background: #27272a;
}

.scroll-container-times::-webkit-scrollbar-thumb {
  background: #581c87;
}
</style>
