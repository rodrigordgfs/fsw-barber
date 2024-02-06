import { defineStore } from "pinia";

export const useBookMenuStore = defineStore("bookMenu", {
  id: "useBookMenuStore",
  state: () => ({
    isOpen: false,
    currentService: null,
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
