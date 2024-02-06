<template>
  <div id="Header" class="bg-zinc-950 w-full flex items-center justify-center">
    <div class="max-w-container w-full my-8 flex items-center justify-between">
      <img
        @click="goToHome"
        class="cursor-pointer"
        src="/logo.svg"
        alt="Logo FSW Barber"
      />
      <div class="flex flex-row gap-6">
        <ClientOnly>
          <button
            v-if="isUserLoggedIn"
            @click="goToReservations"
            class="flex flex-row items-center text-white gap-2 rounded-lg py-2 px-4 outline-none hover:bg-zinc-900 transition-all"
          >
            <Icon name="ic:baseline-calendar-month" size="16" />
            <span class="font-bold text-sm">Agendamentos</span>
          </button>
          <button
            v-if="!isUserLoggedIn"
            @click="useModal.toggleModalLogin"
            class="flex flex-row items-center bg-purple-900 outline-none text-white gap-2 rounded-lg py-2 px-4 hover:bg-purple-800 transition-all"
          >
            <Icon name="ic:baseline-person" size="16" />
            <span class="font-bold text-sm">Perfil</span>
          </button>
          <div
            v-else
            @click="useModal.toggleModalLogout"
            class="flex flex-row items-center gap-2 py-2 px-4 hover:bg-zinc-900 rounded-lg cursor-pointer"
          >
            <NuxtImg class="rounded-full w-9 h-9 shadow" :src="userImage" />
            <span class="font-bold text-sm text-white">{{ userName }}</span>
          </div>
          <template #fallback>
            <LoaderSkeleton width="160px" height="52px" />
            <LoaderSkeleton width="160px" height="52px" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
const useModal = useModalStore();
const user = useSupabaseUser();
const router = useRouter();

const isUserLoggedIn = computed(() => !!user.value);
const userImage = computed(
  () => user.value.identities[0].identity_data.avatar_url
);
const userName = computed(
  () => user.value.identities[0].identity_data.full_name
);

const goToHome = () => {
  router.push("/");
};

const goToReservations = () => {
  router.push("/reservations");
};
</script>

<style></style>
