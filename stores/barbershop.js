import { defineStore } from "pinia";

export const useBarbershopStore = defineStore("barbershop", {
  id: "useBarbershopStore",
  state: () => ({
    recomendedBarbershops: [],
    barbershops: [],
    barbershop: null,
  }),
  actions: {
    async getAllRecomendedBarbershops() {
      const response = await useFetch("api/get-all-recomended-barbershops");
      this.recomendedBarbershops = response.data;
      return response.data;
    },

    async getAllBarbershops() {
      const response = await useFetch("api/get-all-barbershops");
      this.barbershops = response.data;
      return response.data;
    },

    async getBarbershopById(id) {
      const response = await useFetch(`/api/barbershop/${id}`);
      this.barbershop = response.data;
      return response.data;
    },
  },
});
