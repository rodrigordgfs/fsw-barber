<template>
  <div id="Header" class="bg-zinc-900 w-full flex items-center justify-center">
    <div class="max-w-container w-full my-8 flex items-center justify-between">
      <img src="/logo.svg" alt="Logo FSW Barber" />
      <div class="flex flex-row items- gap-6">
        <button
          class="flex flex-row items-center text-white gap-2 rounded-lg py-2 px-4 hover:bg-zinc-800 transition-all"
        >
          <Icon name="ic:baseline-calendar-month" size="16" />
          <span class="font-bold text-sm">Agendamentos</span>
        </button>
        <button
          v-if="!isLogged"
          class="flex flex-row items-center bg-purple-900 text-white gap-2 rounded-lg py-2 px-4 hover:bg-purple-800 transition-all"
        >
          <Icon name="ic:baseline-person" size="16" />
          <span class="font-bold text-sm">Perfil</span>
        </button>
        <div
          v-else
          class="flex flex-row items-center gap-2 py-2 px-4 hover:bg-zinc-800 rounded-lg cursor-pointer"
        >
          <img
            class="rounded-full w-9 h-9 shadow"
            src="https://avatars.githubusercontent.com/u/32286127?v=4"
          />
          <span class="font-bold text-sm text-white">Rodrigo Shinoda</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isLogged = ref(false);
</script>

<style></style>
