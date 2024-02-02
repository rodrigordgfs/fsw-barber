<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
  >
    <OnClickOutside @trigger="useModal.toggleModal">
      <div class="bg-zinc-900 shadow p-5 rounded-2xl">
        <slot></slot>
      </div>
    </OnClickOutside>
  </div>
</template>

<script setup>
import { OnClickOutside } from "@vueuse/components";

const useModal = useModalStore();
</script>

<style></style>
