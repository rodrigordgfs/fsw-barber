<template>
  <Modal v-if="useModal.showModalLogin">
    <div class="flex flex-col items-center max-w-64 w-full">
      <p class="text-base text-white font-bold">Faça login na plataforma</p>
      <p class="text-sm font-normal text-zinc-400 mt-2">
        Conecte-se usando sua conta Google.
      </p>
      <button
        class="w-full bg-transparent rounded-lg border border-zinc-600 text-white flex gap-2 items-center justify-center py-2 px-7 mt-5 hover:bg-zinc-800 transition-all"
        :disabled="isLogging"
        @click="loginWithGoogle"
      >
        <template v-if="!isLogging">
          <Icon name="tabler:brand-google-filled" size="14" color="#FFF" />
          <p class="text-sm font-bold">Google</p></template
        >
        <template v-else>
          <Icon name="eos-icons:bubble-loading" size="14" color="#FFF" />
        </template>
      </button>
    </div>
  </Modal>
</template>

<script setup>
const useModal = useModalStore();
const client = useSupabaseClient();

const isLogging = ref(false);

const loginWithGoogle = async () => {
  isLogging.value = true;
  try {
    await client.auth.signInWithOAuth({
      provider: "google",
      redirectTo: window.location.origin,
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLogging.value = false;
  }
};
</script>

<style></style>
