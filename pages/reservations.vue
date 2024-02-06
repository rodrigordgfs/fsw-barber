<template>
  <div id="Search" class="w-full h-full flex items-center justify-center">
    <div
      class="max-w-container w-full pt-12 flex flex-col gap-10 border-t border-t-zinc-600"
    >
      <h1 class="text-white text-2xl font-bold">Agendamentos</h1>
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
            />
          </div>
          <div v-if="reservationsDone?.length > 0" class="flex flex-col mt-5">
            <p class="uppercase text-xs font-bold text-gray-400">Concluídos</p>
            <CardReservation
              class="mt-2"
              v-for="reservation in reservationsDone"
              :key="reservation.id"
              :reservation="reservation"
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
        <div class="flex-1 flex"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  name: "Reservations",
});

const useUser = useSupabaseUser();
const useReservations = useReservationsStore();

const reservationsReserved = ref([]);
const reservationsConfirmed = ref([]);
const reservationsCanceled = ref([]);
const reservationsDone = ref([]);

onBeforeMount(async () => {
  await useReservations.getAllReservations(useUser.value.id);
});

onMounted(() => {
  watchEffect(() => {
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
</script>

<style></style>
