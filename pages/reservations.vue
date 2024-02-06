<template>
  <div id="Search" class="w-full h-full flex justify-center">
    <div
      class="max-w-container w-full pt-12 flex flex-col gap-10 border-t border-t-zinc-600"
    >
      <h1 class="text-white text-2xl font-bold mb-5">Agendamentos</h1>
      <div class="flex flex-row gap-10">
        <div
          v-if="!useReservations.reservationsLoading"
          class="flex-1 flex flex-col"
        >
          <div v-if="reservationsReserved?.length > 0" class="flex flex-col">
            <p class="uppercase text-xs font-bold text-gray-400">Reservados</p>
            <CardReservation
              class="mt-2"
              v-for="reservation in reservationsReserved"
              :key="reservation.id"
              :reservation="reservation"
              @click="reservationSelected = reservation"
            />
          </div>
          <div
            v-if="reservationsConfirmed?.length > 0"
            class="flex flex-col mt-5"
          >
            <p class="uppercase text-xs font-bold text-gray-400">Confirmados</p>
            <CardReservation
              class="mt-2"
              v-for="reservation in reservationsConfirmed"
              :key="reservation.id"
              :reservation="reservation"
              @click="reservationSelected = reservation"
            />
          </div>
          <div
            v-if="reservationsCanceled?.length > 0"
            class="flex flex-col mt-5"
          >
            <p class="uppercase text-xs font-bold text-gray-400">Cancelados</p>
            <CardReservation
              class="mt-2"
              v-for="reservation in reservationsCanceled"
              :key="reservation.id"
              :reservation="reservation"
              @click="reservationSelected = reservation"
            />
          </div>
          <div v-if="reservationsDone?.length > 0" class="flex flex-col mt-5">
            <p class="uppercase text-xs font-bold text-gray-400">Concluídos</p>
            <CardReservation
              class="mt-2"
              v-for="reservation in reservationsDone"
              :key="reservation.id"
              :reservation="reservation"
              @click="reservationSelected = reservation"
            />
          </div>
        </div>
        <div v-else class="flex-1 flex flex-col">
          <LoaderSkeleton width="200px" height="32px" />
          <LoaderSkeleton class="mt-2" width="100%" height="122px" />
          <LoaderSkeleton class="mt-5" width="200px" height="32px" />
          <LoaderSkeleton class="mt-2" width="100%" height="122px" />
          <LoaderSkeleton class="mt-5" width="200px" height="32px" />
          <LoaderSkeleton class="mt-2" width="100%" height="122px" />
          <LoaderSkeleton class="mt-5" width="200px" height="32px" />
          <LoaderSkeleton class="mt-2" width="100%" height="122px" />
        </div>
        <div class="flex-1" v-if="reservationSelected">
          <div class="flex flex-col mt-5 p-5 rounded-lg bg-zinc-900">
            <div
              v-if="!useReservations.reservationsLoading"
              class="bg-zinc-950 rounded-lg w-full h-44 relative p-5"
            >
              <div
                class="bg-zinc-900 rounded-lg flex flex-row absolute bottom-5 w-[calc(100%-40px)] gap-3 py-3 px-5"
              >
                <NuxtImg
                  class="object-cover rounded-full w-12 h-12"
                  :src="
                    runtimeConfig.public.bucketUrl +
                    '/' +
                    reservationSelected.barbershop.image
                  "
                />
                <div class="flex-1">
                  <p
                    class="text-base text-white font-bold w-[calc(100%-40px)] overflow-hidden whitespace-nowrap overflow-ellipsis"
                  >
                    {{ reservationSelected.barbershop.name }}
                  </p>
                  <p
                    class="text-xs text-white font-normal w-[calc(100%-40px)] overflow-hidden whitespace-nowrap overflow-ellipsis"
                  >
                    {{ reservationSelected.barbershop.address }}
                  </p>
                </div>
              </div>
            </div>
            <LoaderSkeleton v-else width="100%" height="176px" />
            <p
              v-if="!useReservations.reservationsLoading"
              class="uppercase text-white text-sm font-bold mt-5"
            >
              Sobre Nós
            </p>
            <LoaderSkeleton
              v-else
              class="mt-4 mb-5"
              width="100px"
              height="20px"
            />
            <p
              v-if="!useReservations.reservationsLoading"
              class="text-sm text-gray-400 font-normal mt-2 mb-5"
            >
              {{ reservationSelected.barbershop.about }}
            </p>
            <LoaderSkeleton v-else class="mb-5" width="100%" height="100px" />
            <div class="border-t border-t-gray-600 mb-5" />
            <div>
              <ul class="w-full flex flex-col gap-3">
                <li
                  v-if="!useReservations.reservationsLoading"
                  v-for="phone in reservationSelected.barbershop.phones"
                  :key="phone"
                  class="flex flex-row justify-between items-center gap-2"
                >
                  <div class="flex flex-row items-center gap-3">
                    <Icon
                      name="ic:round-phone-android"
                      class="text-white"
                      size="24"
                    />
                    <p class="text-sm text-white font-normal">
                      {{ formatPhoneNumber(phone.number) }}
                    </p>
                  </div>
                  <button
                    @click="copy(phone.number)"
                    class="rounded-lg bg-zinc-800 py-2 px-4 outline-none hover:bg-purple-900 text-white text-sm font-bold transition-all"
                  >
                    Copiar
                  </button>
                </li>
                <LoaderSkeleton
                  v-else
                  v-for="index in 2"
                  class="mt-2"
                  :key="index"
                  width="100%"
                  height="36px"
                />
              </ul>
            </div>
            <div class="border-t border-t-gray-600 my-5" />
            <div
              v-if="!useReservations.reservationsLoading"
              class="p-3 border border-gray-600 rounded-lg bg-zinc-900 flex flex-col gap-3"
            >
              <ul class="flex flex-col gap-3">
                <li class="flex flex-row items-center justify-between">
                  <p class="font-bold text-base text-white">Corte de cabelo</p>
                  <p class="font-bold text-sm text-white">
                    {{
                      Number(reservationSelected.service.price).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )
                    }}
                  </p>
                </li>
                <li class="flex flex-row items-center justify-between">
                  <p class="font-normal text-base text-gray-400">Data</p>
                  <p class="font-normal text-base text-white">
                    {{ dateFormatted }}
                  </p>
                </li>
                <li class="flex flex-row items-center justify-between">
                  <p class="font-normal text-base text-gray-400">Horário</p>
                  <p class="font-normal text-base text-white">
                    {{ reservationSelected.time }}
                  </p>
                </li>
                <li class="flex flex-row items-center justify-between">
                  <p class="font-normal text-base text-gray-400">Barbearia</p>
                  <p class="font-normal text-base text-white">
                    {{ reservationSelected.barbershop.name }}
                  </p>
                </li>
                <li class="flex flex-row items-center justify-between">
                  <p class="font-normal text-base text-gray-400">Status</p>
                  <span
                    class="rounded-lg text-white font-bold text-xs px-2"
                    :class="
                      reservationsStatus[reservationSelected.status].color
                    "
                  >
                    {{ reservationsStatus[reservationSelected.status].text }}
                  </span>
                </li>
              </ul>
            </div>
            <LoaderSkeleton v-else width="100%" height="194px" />
            <div v-if="!useReservations.reservationsLoading">
              <button
                v-if="reservationsStatus[reservationSelected.status].canCancel"
                class="w-full bg-red-800 outline-none text-white rounded-lg py-2 text-sm font-bold mt-5 hover:bg-red-900 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
                :disabled="useReservations.isLoadingCancel"
                @click="cancelReservation"
              >
                <Icon
                  v-if="useReservations.isLoadingCancel"
                  name="eos-icons:bubble-loading"
                  size="14"
                  color="#FFF"
                />
                <span v-else>Cancelar Reserva</span>
              </button>
            </div>
            <LoaderSkeleton v-else class="mt-5" width="100%" height="36px" />
          </div>
        </div>
      </div>
      <div
        v-if="!hasReservations"
        class="flex flex-col items-center justify-center gap-4"
      >
        <Icon
          name="ic:round-event-available"
          size="52"
          class="text-purple-800"
        />
        <p class="text-white font-normal text-2xl">
          Você ainda não tem reservas.
        </p>
        <button
          class="bg-purple-800 rounded-lg py-2 px-4 text-white font-bold text-sm hover:bg-purple-900 transition-all"
          @click="router.push('/')"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";
import dayjs from "dayjs";

const router = useRouter();
const { copy } = useClipboard();

definePageMeta({
  name: "Reservations",
  middleware: ["auth"],
});

const reservationsStatus = {
  RESERVED: {
    text: "Reservado",
    color: "bg-purple-800",
    canCancel: true,
  },
  CONFIRMED: {
    text: "Confirmado",
    color: "bg-green-800",
    canCancel: true,
  },
  CANCELED: {
    text: "Cancelado",
    color: "bg-red-800",
    canCancel: false,
  },
  DONE: {
    text: "Concluído",
    color: "bg-blue-800",
    canCancel: false,
  },
};

const useUser = useSupabaseUser();
const useReservations = useReservationsStore();
const runtimeConfig = useRuntimeConfig();

const reservationsReserved = ref([]);
const reservationsConfirmed = ref([]);
const reservationsCanceled = ref([]);
const reservationsDone = ref([]);
const hasReservations = ref(false);

const reservationSelected = ref(null);

onBeforeMount(async () => {
  await useReservations.getAllReservations(useUser.value.id);
});

onMounted(() => {
  watchEffect(() => {
    hasReservations.value = useReservations.reservations?.length > 0;
    reservationsReserved.value = useReservations.reservations?.filter(
      (reservation) => reservation.status === "RESERVED"
    );
    reservationsConfirmed.value = useReservations.reservations?.filter(
      (reservation) => reservation.status === "CONFIRMED"
    );
    reservationsCanceled.value = useReservations.reservations?.filter(
      (reservation) => reservation.status === "CANCELED"
    );
    reservationsDone.value = useReservations.reservations?.filter(
      (reservation) => reservation.status === "DONE"
    );
  });
});

const cancelReservation = async () => {
  useReservations.isLoadingCancel = true;
  await useReservations
    .cancelReservation(reservationSelected.value.id)
    .then(() => {
      useReservations.getAllReservations(useUser.value.id);
      reservationSelected.value.status = "CANCELED";
    });
  useReservations.isLoadingCancel = false;
};

const dateFormatted = computed(() => {
  return dayjs()
    .format("DD [de] MMMM")
    .replace(/^\w/, (char) => char.toUpperCase());
});

const formatPhoneNumber = (phoneNumber) => {
  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
    2,
    3
  )} ${phoneNumber.slice(3, 7)} - ${phoneNumber.slice(7)}`;
};
</script>

<style></style>
