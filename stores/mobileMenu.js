import { defineStore } from "pinia";

export const useMobileMenuStore = defineStore("mobileMenu", {
  id: "useMobileMenuStore",
  state: () => ({
    isOpen: false,
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
