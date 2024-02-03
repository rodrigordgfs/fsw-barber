<template>
  <div
    id="Barbershop"
    class="w-full h-full flex items-center justify-center border-t border-t-zinc-600"
  >
    <div class="max-w-container w-full mt-12 flex flex-row gap-10">
      <div class="flex-1 flex flex-col">
        <img
          :src="runtimeConfig.public.bucketUrl + '/' + barbershop.image"
          class="w-full h-96 rounded-lg shadow object-cover"
        />
        <div class="flex flex-row gap-10 mt-5 items-center">
          <div class="flex-1 flex flex-col gap-3">
            <h1 class="text-3xl font-bold text-white">{{ barbershop.name }}</h1>
            <div class="flex flex-row gap-2 items-center">
              <Icon
                name="ic:baseline-location-on"
                class="text-purple-600"
                size="16"
              />
              <p class="text-sm text-white font-normal">
                {{ barbershop.address }}
              </p>
            </div>
          </div>
          <div
            class="bg-zinc-800 py-3 px-5 rounded-lg flex flex-col gap-2 items-center justify-center"
          >
            <div class="flex flex-row items-center gap-1">
              <Icon name="ic:baseline-star" class="text-purple-600" size="20" />
              <p class="text-white text-xl font-normal">{{ rate }}</p>
            </div>
            <p class="text-xs text-white font-normal">
              {{ ratesQuantity }} avaliações
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-3 mt-10">
          <h2 class="uppercase font-bold text-sm text-zinc-400">Serviços</h2>
          <div class="grid grid-cols-2 gap-5">
            <CardServices
              v-for="service in barbershop.services"
              :key="barbershop"
              :service="service"
            />
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="w-full flex flex-col p-5 rounded-lg bg-zinc-800">
          <div class="w-full flex">
            <div class="bg-zinc-900 rounded-lg w-full h-44 relative p-5">
              <div
                class="bg-zinc-800 rounded-lg flex flex-row absolute bottom-5 w-[calc(100%-40px)] gap-3 py-3 px-5"
              >
                <img
                  class="object-cover rounded-full w-12 h-12"
                  :src="runtimeConfig.public.bucketUrl + '/' + barbershop.image"
                />
                <div class="flex-1">
                  <p
                    class="text-base text-white font-bold w-[calc(100%-40px)] overflow-hidden whitespace-nowrap overflow-ellipsis"
                  >
                    {{ barbershop.name }}
                  </p>
                  <p
                    class="text-xs text-white font-normal w-[calc(100%-40px)] overflow-hidden whitespace-nowrap overflow-ellipsis"
                  >
                    {{ barbershop.address }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p class="uppercase text-white text-sm font-bold mt-5">Sobre Nós</p>
          <p class="text-sm text-gray-400 font-normal mt-2 mb-5">
            {{ barbershop.about }}
          </p>
          <div class="border-t border-t-gray-600 mb-5" />
          <div>
            <ul class="w-full flex flex-col gap-3">
              <li
                v-for="phone in barbershop.phones"
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
                  class="rounded-lg bg-zinc-900 py-2 px-4 hover:bg-purple-900 text-white text-sm font-bold transition-all"
                >
                  Copiar
                </button>
              </li>
            </ul>
          </div>
          <div class="border-t border-t-gray-600 my-5" />
          <div class="text-white flex items-center justify-center">Soon</div>
          <div class="border-t border-t-gray-600 my-5" />
          <div class="flex flex-row items-center justify-between">
            <p class="text-sm text-white font-normal">Em parceria com</p>
            <img class="mt-2" src="/logo.svg" alt="Logo FSW Barber" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";

const route = useRoute();
const useBarbershop = useBarbershopStore();
const runtimeConfig = useRuntimeConfig();
const { copy } = useClipboard();

const barbershop = ref({});

onBeforeMount(async () => {
  await useBarbershop.getBarbershopById(route.params.id);
});

onMounted(() => {
  watchEffect(() => {
    barbershop.value = useBarbershop.barbershop;
  });
});

// onUnmounted(() => {
//   useBarbershop.barbershop = {};
// });

const rate = computed(() => {
  if (barbershop.value.rates?.length > 0) {
    const count = barbershop.value.rates.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.rate;
    }, 0);
    return Number(count / barbershop.value.rates.length).toFixed(1);
  }
  return Number(5.0).toFixed(1);
});

const ratesQuantity = computed(() => {
  return barbershop.value.rates?.length || 0;
});

const formatPhoneNumber = (phoneNumber) => {
  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
    2,
    3
  )} ${phoneNumber.slice(3, 7)} - ${phoneNumber.slice(7)}`;
};
</script>

<style></style>