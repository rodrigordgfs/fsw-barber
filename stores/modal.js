import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  id: "useModalStore",
  state: () => ({
    showModalLogin: false,
    showModalLogout: false,
  }),
  actions: {
    toggleModalLogin() {
      this.showModalLogin = !this.showModalLogin;
    },

    toggleModalLogout() {
      this.showModalLogout = !this.showModalLogout;
    },
  },
});
