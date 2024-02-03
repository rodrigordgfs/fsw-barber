<template>
  <div>
    <div
      v-if="useBookMenu.isOpen"
      class="absolute top-0 right-0 w-[450px] h-screen bg-zinc-900 p-5 rounded-md shadow-lg z-50"
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
      </div>
    </div>
  </div>

  <div
    v-if="useBookMenu.isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="useBookMenu.toggle"
  ></div>
</template>

<script setup>
const useBookMenu = useBookMenuStore();
</script>

<style></style>
