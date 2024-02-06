<template>
  <div id="DefaultLayout" class="px-2">
    <BookMenu />
    <Header />
    <slot />
    <Footer />
    <ModalLogin />
    <ModalLogout />
    <ModalReservationDone />
  </div>
</template>

<script setup></script>

<style></style>
