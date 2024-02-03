import { defineStore } from "pinia";

export const useBarbershopStore = defineStore("barbershop", {
  id: "useBarbershopStore",
  state: () => ({
    recomendedBarbershops: [],
    recomendedBarbershopsLoading: true,
    barbershops: [],
    barbershopsLoading: true,
    barbershop: null,
    barbershopLoading: true,
  }),
  actions: {
    async getAllRecomendedBarbershops() {
      this.recomendedBarbershopsLoading = true;
      this.recomendedBarbershops = [];
      const response = await useFetch(
        "api/get-all-recomended-barbershops"
      ).finally(() => {
        this.recomendedBarbershopsLoading = false;
      });
      this.recomendedBarbershops = response.data;
      return response.data;
    },

    async getAllBarbershops() {
      this.barbershopsLoading = true;
      this.barbershops = [];
      const response = await useFetch("api/get-all-barbershops").finally(() => {
        this.barbershopsLoading = false;
      });
      this.barbershops = response.data;
      return response.data;
    },

    async getBarbershopById(id) {
      this.barbershopLoading = true;
      this.barbershop = null;
      const response = await useFetch(`/api/barbershop/${id}`).finally(() => {
        this.barbershopLoading = false;
      });
      this.barbershop = response.data;
      return response.data;
    },

    async getSearchBarbershops(query) {
      this.barbershopsLoading = true;
      this.barbershops = [];
      const response = await useFetch("api/get-search-barbershops", {
        query: { query },
      }).finally(() => {
        this.barbershopsLoading = false;
      });
      this.barbershops = response.data;
      return response.data;
    },
  },
});
