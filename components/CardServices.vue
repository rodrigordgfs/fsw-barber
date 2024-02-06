<template>
  <div
    class="flex flex-row gap-3 bg-zinc-900 border border-gray-600 rounded-lg p-3"
  >
    <NuxtImg
      class="object-cover w-28 h-28 rounded-lg shadow"
      :src="runtimeConfig.public.bucketUrl + '/' + service.image"
    />
    <div class="flex-1 flex flex-col justify-center gap-1">
      <p class="text-sm text-white font-bold mb-1">{{ service.name }}</p>
      <p class="text-sm font-normal text-gray-400">
        {{ service.description }}
      </p>
      <div class="flex flex-row gap-2 items-center">
        <p class="flex-1 text-purple-600 text-sm font-bold">
          {{
            service.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          }}
        </p>
        <button
          @click="book"
          class="bg-zinc-800 rounded-lg py-2 px-4 text-sm outline-none text-white font-bold hover:bg-purple-900 transition-all"
        >
          Reservar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const user = useSupabaseUser();
const useBookMenu = useBookMenuStore();
const useModalLogin = useModalStore();

const props = defineProps({
  service: Object,
});

const book = () => {
  if (!user.value) {
    useModalLogin.toggleModalLogin();
  } else {
    useBookMenu.currentService = props.service;
    useBookMenu.toggle();
  }
};
</script>

<style></style>
