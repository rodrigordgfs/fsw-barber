<template>
  <div id="Header" class="bg-zinc-900 w-full flex items-center justify-center">
    <div class="max-w-[800px] w-full my-8 flex items-center justify-between">
      <img src="/logo.svg" alt="Logo FSW Barber" />
      <div class="flex flex-row items- gap-6">
        <button
          class="flex flex-row items-center text-white gap-2 rounded-lg py-2 px-4 hover:bg-zinc-800 transition-all"
        >
          <Icon name="ic:baseline-calendar-month" size="16" />
          <span class="font-bold text-sm">Agendamentos</span>
        </button>
        <button
          class="flex flex-row items-center bg-purple-900 text-white gap-2 rounded-lg py-2 px-4 hover:bg-purple-800 transition-all"
        >
          <Icon name="ic:baseline-person" size="16" />
          <span class="font-bold text-sm">Perfil</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
