<template>
  <div
    class="flex flex-row items-center rounded-lg border border-zinc-600 bg-zinc-900 p-3 hover:bg-zinc-800 transition-all cursor-pointer"
  >
    <div class="flex-1 flex flex-col border-r border-r-zinc-600">
      <div>
        <span
          class="rounded-lg text-white font-bold text-xs px-2"
          :class="reservationsStatus[reservation.status].color"
        >
          {{ reservationsStatus[reservation.status].text }}
        </span>
      </div>
      <p class="text-white text-lg font-bold mt-3">
        {{ reservationServiceName }}
      </p>
      <div class="flex items-center flex-row gap-2 mt-2">
        <NuxtImg
          class="w-6 h-6 rounded-full shadow"
          :src="runtimeConfig.public.bucketUrl + '/' + reservationServiceImage"
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
</template>

<script setup>
import moment from "moment";
import dayjs from "dayjs";

const props = defineProps({
  reservation: Object,
});

const reservationsStatus = {
  RESERVED: {
    text: "Reservado",
    color: "bg-purple-800",
  },
  CONFIRMED: {
    text: "Confirmado",
    color: "bg-green-800",
  },
  CANCELED: {
    text: "Cancelado",
    color: "bg-red-800",
  },
  DONE: {
    text: "Concluído",
    color: "bg-blue-800",
  },
};

const runtimeConfig = useRuntimeConfig();

const reservationServiceName = computed(() => {
  return props.reservation.service?.name;
});
const reservationServiceImage = computed(() => {
  return props.reservation.service?.image;
});
const reservationBarbershopName = computed(() => {
  return props.reservation.barbershop?.name;
});
const reservationMonth = computed(() => {
  return dayjs(String(props.reservation.date).split("/")[1])
    .format("MMMM")
    .replace(/^\w/, (char) => char.toUpperCase());
});
const reservationDay = computed(() => {
  return String(props.reservation.date).split("/")[0];
});
</script>

<style></style>
