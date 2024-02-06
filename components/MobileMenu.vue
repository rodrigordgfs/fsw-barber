<template>
  <div>
    <div
      v-if="useMobileMenu.isOpen"
      class="fixed top-0 right-0 w-full md:w-[450px] h-screen bg-zinc-900 p-5 rounded-md shadow-lg z-50 overflow-y-auto"
    >
      <div class="flex flex-col">
        <div class="flex flex-row items-center justify-between">
          <p class="text-white font-bold text-lg">Menu</p>
          <Icon
            name="ic:outline-close"
            color="#FFF"
            size="24"
            class="cursor-pointer"
            @click="useMobileMenu.toggle"
          />
        </div>
        <div class="border-t border-t-gray-600 my-5" />
      </div>
    </div>
  </div>

  <div
    v-if="useMobileMenu.isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="useMobileMenu.toggle"
  />
</template>

<script setup>
const useMobileMenu = useMobileMenuStore();
const useUser = useSupabaseUser();
</script>

<style></style>
