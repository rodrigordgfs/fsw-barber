import { defineStore } from "pinia";

export const useBookMenuStore = defineStore("bookMenu", {
  id: "useBookMenuStore",
  state: () => ({
    isOpen: false,
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
