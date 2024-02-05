import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  id: "useModalStore",
  state: () => ({
    showModalLogin: false,
    showModalLogout: false,
    showModalReservationDone: false,
  }),
  actions: {
    toggleModalLogin() {
      this.showModalLogin = !this.showModalLogin;
    },

    toggleModalLogout() {
      this.showModalLogout = !this.showModalLogout;
    },

    toggleModalReservationDone() {
      this.showModalReservationDone = !this.showModalReservationDone;
    },
  },
});
