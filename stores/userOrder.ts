import { defineStore } from "pinia";
export default defineStore("order", {
  persist: true,
  state: () => ({
    orders: [],
  }),
  getters: {
    getOrders: (state) => state.orders,
  },
  actions: {
    addOrder(order) {
      this.orders.push(order);
    },
  },
});
