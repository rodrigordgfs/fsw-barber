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
    barbershopsByVisits: [],
    barbershopsByVisitsLoading: true,
    barbershopsHighlights: [],
    barbershopsHighlightsLoading: true,
  }),
  actions: {
    async getAllRecomendedBarbershops() {
      this.recomendedBarbershopsLoading = true;
      this.recomendedBarbershops = [];
      const response = await useFetch("api/get-all-recomended-barbershops")
        .catch((error) => {})
        .finally(() => {
          this.recomendedBarbershopsLoading = false;
        });
      this.recomendedBarbershops = response.data;
      return response.data;
    },

    async getAllBarbershops() {
      this.barbershopsLoading = true;
      this.barbershops = [];
      const response = await useFetch("api/get-all-barbershops")
        .catch((error) => {})
        .finally(() => {
          this.barbershopsLoading = false;
        });
      this.barbershops = response.data;
      return response.data;
    },

    async getBarbershopById(id) {
      this.barbershopLoading = true;
      this.barbershop = null;
      const response = await useFetch(`/api/barbershop/${id}`)
        .catch((error) => {})
        .finally(() => {
          this.barbershopLoading = false;
        });
      await this.patchIncreaseVisit(id);
      this.barbershop = response.data;
      return response.data;
    },

    async getSearchBarbershops(query) {
      this.barbershopsLoading = true;
      this.barbershops = [];
      const response = await useFetch("api/get-search-barbershops", {
        query: { query },
      })
        .catch((error) => {})
        .finally(() => {
          this.barbershopsLoading = false;
        });
      this.barbershops = response.data;
      return response.data;
    },

    async getBarbershopsByVisits(query) {
      this.barbershopsByVisitsLoading = true;
      this.barbershopsByVisits = [];
      const response = await useFetch("api/get-barbershops-by-visits", {
        query,
      })
        .catch((error) => {})
        .finally(() => {
          this.barbershopsByVisitsLoading = false;
        });
      this.barbershopsByVisits = response.data;
      return response.data;
    },

    async getBarbershopsHighlights(query) {
      this.barbershopsHighlightsLoading = true;
      this.barbershopsHighlights = [];
      const response = await useFetch("api/get-barbershops-highlights", {
        query,
      })
        .catch((error) => {})
        .finally(() => {
          this.barbershopsHighlightsLoading = false;
        });
      this.barbershopsHighlights = response.data;
      return response.data;
    },

    async patchIncreaseVisit(id) {
      const response = await useFetch(`/api/patch-increase-visit`, {
        method: "PATCH",
        query: { barbershopId: id },
      }).catch((error) => {});
      return response.data;
    },
  },
});
