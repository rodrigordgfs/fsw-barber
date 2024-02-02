<template>
  <div
    class="bg-zinc-800 border border-zinc-600 rounded-2xl flex flex-col w-56"
  >
    <div class="relative">
      <img
        class="m-3 rounded-xl h-36 w-[calc(100%-24px)] bg-cover"
        :src="barbershop.image"
      />
      <div>
        <p
          class="absolute top-4 left-4 py-1 flex fle-row gap-1 items-center bg-purple-900 bg-opacity-70 text-purple-300 font-bold text-xs px-2 rounded-2xl"
        >
          <Icon name="ic:baseline-star-rate" size="12" />
          {{ barbershop.rating }}
        </p>
      </div>
    </div>
    <div class="m-3">
      <p class="text-white text-base font-bold">Vintage Barber</p>
      <p class="text-zinc-400 text-sm font-normal mt-1">
        Avenida São Sebastião, 357, São Paulo
      </p>
    </div>
    <button
      class="bg-zinc-900 text-white font-bold rounded-lg mx-3 mb-3 p-2 hover:bg-zinc-700 transition-all cursor-pointer"
    >
      Reservar
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  barbershop: Object,
});
</script>

<style></style>
