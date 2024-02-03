<template>
  <div
    class="bg-zinc-900 border border-zinc-600 rounded-2xl flex flex-col w-56"
  >
    <div class="relative">
      <img
        class="m-3 rounded-xl h-36 w-[calc(100%-24px)] object-cover"
        :src="runtimeConfig.public.bucketUrl + '/' + barbershop.image"
      />
      <div>
        <p
          class="absolute top-4 left-4 py-1 flex fle-row gap-1 items-center bg-purple-900 bg-opacity-70 text-purple-300 font-bold text-xs px-2 rounded-2xl"
        >
          <Icon name="ic:baseline-star-rate" size="12" />
          {{ rate }}
        </p>
      </div>
    </div>
    <div class="m-3">
      <p class="text-white text-base font-bold">{{ barbershop.name }}</p>
      <p class="text-zinc-400 text-sm font-normal mt-1">
        {{ barbershop.address }}
      </p>
    </div>
    <button
      @click="openBarbershop(barbershop.id)"
      class="bg-zinc-800 text-white font-bold rounded-lg mx-3 mb-3 p-2 hover:bg-purple-900 transition-all cursor-pointer"
    >
      Reservar
    </button>
  </div>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
  barbershop: Object,
});

const runtimeConfig = useRuntimeConfig();

const rate = computed(() => {
  console.log();
  if (props.barbershop?.rates?.length > 0) {
    const count = props.barbershop.rates.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.rate;
    }, 0);
    return Number(count / props.barbershop.rates.length).toFixed(1);
  }
  return Number(5.0).toFixed(1);
});

const openBarbershop = (id) => {
  router.push(`/barbershop/${id}`);
};
</script>

<style></style>
