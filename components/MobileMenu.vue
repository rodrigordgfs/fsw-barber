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
        <div
          v-if="isUserLoggedIn"
          class="flex flex-row justify-between items-center"
        >
          <div class="flex flex-row items-center gap-4">
            <NuxtImg class="rounded-full w-10 h-10 shadow" :src="userImage" />
            <p class="text-white font-bold text-base">{{ userName }}</p>
          </div>
          <div
            @click="logout"
            class="bg-zinc-800 px-3 py-3 rounded-lg hover:bg-zinc-950 transition-all"
          >
            <Icon
              name="ic:round-exit-to-app"
              color="#FFF"
              size="24"
              class="cursor-pointer"
              @click="useModal.toggleModalLogout"
            />
          </div>
        </div>
        <div
          v-else
          @click="login"
          class="bg-zinc-800 rounded-lg px-4 py-3 flex flex-row gap-2 hover:bg-zinc-950 transition-all"
        >
          <Icon name="ic:round-exit-to-app" color="#FFF" size="16" />
          <p class="text-white font-bold text-sm">Fazer Login</p>
        </div>
        <div
          @click="goToHome"
          class="border border-zinc-600 mt-5 rounded-lg px-4 py-3 flex flex-row gap-2 hover:bg-zinc-800 transition-all"
        >
          <Icon name="ic:baseline-home" color="#FFF" size="16" />
          <p class="text-white font-bold text-sm">Início</p>
        </div>
        <div
          @click="goToReservations"
          class="border border-zinc-600 mt-3 rounded-lg px-4 py-3 flex flex-row gap-2 hover:bg-zinc-800 transition-all"
        >
          <Icon name="ic:baseline-calendar-month" color="#FFF" size="16" />
          <p class="text-white font-bold text-sm">Agendamentos</p>
        </div>
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
const router = useRouter();
const useModal = useModalStore();

const isUserLoggedIn = computed(() => !!useUser.value);

const userImage = computed(() => {
  return useUser.value.identities[0].identity_data.avatar_url;
});

const userName = computed(() => {
  return useUser.value.identities[0].identity_data.full_name;
});

const goToHome = () => {
  useMobileMenu.toggle();
  router.push("/");
};

const goToReservations = () => {
  useMobileMenu.toggle();
  router.push("/reservations");
};

const login = () => {
  useMobileMenu.toggle();
  useModal.toggleModalLogin();
};

const logout = () => {
  useMobileMenu.toggle();
  useModal.showModalLogout = true;
};
</script>

<style></style>
