<template>
  <div
    :style="{ width: width, height: height }"
    class="rounded-lg bg-gray-700 animate-pulse"
  ></div>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style></style>
