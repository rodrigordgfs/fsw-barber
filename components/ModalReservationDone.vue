<template>
  <Modal v-if="useModal.showModalReservationDone">
    <div
      class="flex flex-col items-center justify-center max-w-64 w-full gap-5"
    >
      <div
        class="bg-green-500 rounded-full p-3 flex flex-row items-center justify-center"
      >
        <Icon name="ic:baseline-done" size="32" color="#18181B" />
      </div>
      <p class="text-white font-bold text-base">Reserva Efetuada!</p>
      <p class="text-gray-400 font-bold text-sm">
        Sua reserva foi agendada com sucesso.
      </p>
      <button
        class="w-full bg-purple-800 text-white rounded-lg py-2 text-sm font-bold hover:bg-purple-900 transition-all"
        @click="confirm"
      >
        Confirmar
      </button>
    </div>
  </Modal>
</template>

<script setup>
const useModal = useModalStore();
const useBookMenu = useBookMenuStore();

const confirm = () => {
  useModal.toggleModalReservationDone();
};
</script>

<style></style>
