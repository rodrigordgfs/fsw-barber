<template>
  <div>
    <div
      v-if="useBookMenu.isOpen"
      class="fixed top-0 right-0 w-[450px] h-screen bg-zinc-900 p-5 rounded-md shadow-lg z-50"
    >
      <div class="flex flex-col">
        <div class="flex flex-row items-center justify-between">
          <p class="text-white font-bold text-lg">Fazer Reserva</p>
          <Icon
            name="ic:outline-close"
            color="#FFF"
            size="24"
            class="cursor-pointer"
            @click="useBookMenu.toggle"
          />
        </div>
        <div class="border-t border-t-gray-600 my-5" />
        <ClientOnly>
          <VDatePicker
            class="calendar"
            locale="pt-BR"
            v-model="date"
            expanded
            transparent
            borderless
            :attributes="calendarAttrs"
            :color="selectedColor"
            :min-date="new Date()"
            @click="dayChanged(calendarDay, event)"
          />
        </ClientOnly>
        <div></div>
        <div v-if="date" class="border-t border-t-gray-600 mb-5" />
        <div v-if="date" class="grid grid-cols-5 gap-3 pb-4">
          <p
            v-if="!loadingTimes"
            v-for="time in times"
            :key="time"
            class="py-2 px-4 border border-gray-600 rounded-full text-white font-normal text-sm transition-all"
            :class="{
              'bg-purple-800': timeSelected === time.time,
              'bg-transparent': !timeSelected === time.time,
              'bg-gray-600 cursor-not-allowed': !time.available,
              'hover:bg-purple-600 cursor-pointer': time.available,
            }"
            @click="selectTime(time)"
          >
            {{ time.time }}
          </p>
          <LoaderSkeleton
            v-else
            v-for="index in 15"
            :key="index"
            width="72px"
            height="38px"
          />
        </div>
        <div v-if="timeSelected">
          <div class="border-t border-t-gray-600 my-5" />
          <div
            class="p-3 border border-gray-600 rounded-lg bg-zinc-800 flex flex-col gap-3"
          >
            <ul class="flex flex-col gap-3">
              <li class="flex flex-row items-center justify-between">
                <p class="font-bold text-base text-white">
                  {{ useBookMenu.currentService.name }}
                </p>
                <p class="font-bold text-sm text-white">
                  {{
                    useBookMenu.currentService.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
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
                  {{ timeSelected }}
                </p>
              </li>
              <li class="flex flex-row items-center justify-between">
                <p class="font-normal text-base text-gray-400">Barbearia</p>
                <p class="font-normal text-base text-white">
                  {{ barbershop.name }}
                </p>
              </li>
            </ul>
          </div>
          <button
            class="w-full bg-purple-800 outline-none text-white rounded-lg py-2 text-sm font-bold mt-5 hover:bg-purple-900 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
            :disabled="savingReservation"
            @click="saveReservation"
          >
            <Icon
              v-if="savingReservation"
              name="eos-icons:bubble-loading"
              size="14"
              color="#FFF"
            />
            <span v-else>Reservar horário</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="useBookMenu.isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="useBookMenu.toggle"
  />
</template>

<script setup>
import moment from "moment";

const useBookMenu = useBookMenuStore();
const useUser = useSupabaseUser();
const useModal = useModalStore();
const useBarbershop = useBarbershopStore();
const { timeInterval } = useTimeInterval();

const loadingTimes = ref(false);
const savingReservation = ref(false);
const date = ref(new Date());
const times = ref([]);
const timeSelected = ref("");
const barbershop = ref({});
const selectedColor = ref("purple");
const calendarAttrs = ref([
  {
    key: "today",
    dates: new Date(),
  },
]);

const dateFormatted = computed(() => {
  return moment(date.value).locale("pt-BR").format("DD [de] MMMM");
});

watch(
  () => useBookMenu.isOpen,
  (isOpen) => {
    if (isOpen) {
      dayChanged();
    }
  }
);

const dayChanged = async () => {
  console.log("barbershop", barbershop);
  timeSelected.value = "";
  if (date.value) {
    loadingTimes.value = true;

    const dayOfWeek = String(moment(date.value).format("dddd")).toUpperCase();
    const barbershopId = barbershop.id;

    const data = await $fetch("/api/get-time-of-day", {
      params: {
        dayOfWeek,
        barbershopId,
      },
    });

    const timesInterval = timeInterval(data.open, data.close);
    const promises = timesInterval.map(async (time) => {
      const available = await $fetch("/api/get-check-date-time", {
        params: {
          date: moment(date.value).format("DD/MM/YYYY"),
          time,
          barbershopId,
        },
      });

      return {
        time,
        available,
      };
    });
    times.value = await Promise.all(promises);

    loadingTimes.value = false;
  }
};

const selectTime = (time) => {
  if (!time.available) return;
  if (timeSelected.value === time.time) {
    timeSelected.value = "";
  } else {
    timeSelected.value = time.time;
  }
};

const saveReservation = async () => {
  savingReservation.value = true;

  await $fetch("/api/post-save-reservation", {
    method: "POST",
    body: JSON.stringify({
      date: moment(date.value).format("DD/MM/YYYY"),
      time: timeSelected.value,
      barbershopId: useBarbershop.barbershop.id,
      userId: useUser.value.id,
      serviceId: useBookMenu.currentService.id,
    }),
  }).finally(() => {
    savingReservation.value = false;
    useBookMenu.currentService = null;
    useBookMenu.toggle();
    useModal.toggleModalReservationDone();
  });
};

onMounted(() => {
  watchEffect(() => {
    barbershop.value = useBarbershop.barbershop;
  });
});
</script>

<style>
.calendar,
.vc-title {
  color: #fff !important;
}

.vc-weekday-1,
.vc-weekday-2,
.vc-weekday-3,
.vc-weekday-4,
.vc-weekday-5,
.vc-weekday-6,
.vc-weekday-7,
.vc-disabled {
  color: #52525b !important;
}

.vc-highlight {
  color: #581c87 !important;
}

.scroll-container-times {
  overflow-x: scroll;
  overflow-y: hidden;
}

.scroll-container-times::-webkit-scrollbar {
  width: 12px;
}

.scroll-container-times::-webkit-scrollbar-track {
  background: #27272a;
}

.scroll-container-times::-webkit-scrollbar-thumb {
  background: #581c87;
}
</style>
