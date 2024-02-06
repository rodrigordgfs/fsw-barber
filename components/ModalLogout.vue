<template>
  <Modal v-if="useModal.showModalLogout">
    <div class="flex flex-col items-center max-w-64 w-full">
      <p class="text-base text-white font-bold">Sair da Plataforma</p>
      <p class="text-sm font-normal text-zinc-400 mt-2">
        Deseja realmente sair?
      </p>
      <div class="flex flex-row gap-2 mt-5">
        <button
          v-if="!isLogginOut"
          class="w-1/2 bg-transparent outline-none rounded-lg border border-zinc-600 text-white flex gap-2 items-center justify-center py-2 px-7 hover:bg-zinc-800 transition-all"
          @click="useModal.toggleModalLogout"
        >
          <p class="text-sm font-bold">Cancelar</p>
        </button>
        <button
          class="w-1/2 bg-transparent outline-none rounded-lg border border-zinc-600 text-white flex gap-2 items-center justify-center py-2 px-7 hover:bg-red-500 transition-all"
          :class="{
            'w-full': isLogginOut,
          }"
          :disabled="isLogginOut"
          @click="logout"
        >
          <template v-if="!isLogginOut">
            <Icon name="material-symbols:exit-to-app" size="14" color="#FFF" />
            <p class="text-sm font-bold">Sair</p></template
          >
          <template v-else>
            <Icon name="eos-icons:bubble-loading" size="14" color="#FFF" />
          </template>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
const useModal = useModalStore();
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const isLogginOut = ref(false);

const logout = async () => {
  isLogginOut.value = true;
  try {
    await client.auth.signOut().then(() => {
      user.value = null;
      useModal.toggleModalLogout();
      router.push("/");
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLogginOut.value = false;
  }
};
</script>

<style></style>
