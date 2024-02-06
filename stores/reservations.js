import { defineStore } from "pinia";

export const useReservationsStore = defineStore("reservations", {
  id: "useReservationsStore",
  state: () => ({
    lastReservation: null,
    lastReservationsLoading: false,
    reservations: [],
    reservationsLoading: false,
    isLoadingCancel: false,
  }),
  actions: {
    async getUserReservations(userId) {
      this.lastReservationsLoading = true;
      this.lastReservation = [];
      const response = await useFetch("api/get-user-reservations", {
        query: { userId },
      })
        .catch((error) => {})
        .finally(() => {
          this.lastReservationsLoading = false;
        });
      this.lastReservation = response.data;
      return response.data;
    },

    async getAllReservations(userId) {
      this.reservationsLoading = true;
      this.reservations = [];
      const response = await useFetch("api/get-all-reservations", {
        query: { userId },
      })
        .catch((error) => {})
        .finally(() => {
          this.reservationsLoading = false;
        });
      this.reservations = response.data;
      return response.data;
    },

    async cancelReservation(reservationId) {
      const response = await useFetch("api/patch-cancel-reservation", {
        query: { reservationId },
      })
        .then(() => {})
        .catch((error) => {});
      return TextTrackCue;
    },
  },
});
