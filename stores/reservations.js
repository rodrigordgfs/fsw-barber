import { defineStore } from "pinia";

export const useReservationsStore = defineStore("reservations", {
  id: "useReservationsStore",
  state: () => ({
    lastReservation: null,
    lastReservationsLoading: true,
  }),
  actions: {
    async getUserReservations(userId) {
      this.lastReservationsLoading = true;
      this.lastReservation = [];
      const response = await useFetch("api/get-user-reservations", {
        query: { userId },
      }).finally(() => {
        this.lastReservationsLoading = false;
      });
      this.lastReservation = response.data;
      return response.data;
    },
  },
});
