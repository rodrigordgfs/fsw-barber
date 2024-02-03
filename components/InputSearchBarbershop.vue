<template>
  <form
    @submit.prevent="searchBarbershop"
    class="flex flex-row items-center gap-2 mt-12"
  >
    <input
      class="w-full bg-zinc-950 border border-zinc-600 text-white text-sm h-9 outline-none py-2 px-3 rounded-lg"
      type="text"
      placeholder="Buscar Barbearias"
      v-model="search"
    />
    <button
      type="submit"
      class="flex items-center justify-center rounded-lg w-10 h-9 bg-purple-900 hover:bg-purple-800 transition-all disabled:bg-zinc-700"
      :disabled="search.length < 3"
    >
      <Icon name="ic:round-search" color="#FFF" size="24" />
    </button>
  </form>
</template>

<script setup>
const router = useRouter();

const search = ref("");
const searchBarbershop = () => {
  router.push({ name: "Search", query: { search: search.value } });
};
</script>

<style></style>
