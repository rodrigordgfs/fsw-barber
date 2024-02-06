<template>
  <div id="DefaultLayout">
    <BookMenu />
    <MobileMenu />
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
