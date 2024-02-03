<template>
  <form @submit.prevent="" class="flex flex-row items-center gap-2 mt-12">
    <input
      class="w-full bg-zinc-950 border border-zinc-600 text-white text-sm h-9 outline-none py-2 px-3 rounded-lg"
      type="text"
      placeholder="Buscar Barbearias"
    />
    <button
      type="submit"
      class="flex items-center justify-center rounded-lg w-10 h-9 bg-purple-900 hover:bg-purple-800 transition-all"
    >
      <Icon name="ic:round-search" color="#FFF" size="24" />
    </button>
  </form>
</template>

<script setup></script>

<style></style>
