import { defineStore } from "pinia";

export const useBarbershopStore = defineStore("barbershop", {
  id: "useBarbershopStore",
  state: () => ({
    recomendedBarbershops: [],
    barbershops: [],
  }),
  actions: {
    async getAllRecomendedBarbershops() {
      const response = await useFetch(
        "api/barbershop/get-all-recomended-barbershops"
      );
      this.recomendedBarbershops = response.data;
      return response.data;
    },

    async getAllBarbershops() {
      const response = await useFetch("api/barbershop/get-all-barbershops");
      this.barbershops = response.data;
      return response.data;
    },
  },
});
