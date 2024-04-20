import { defineStore } from "pinia";
import json from "@/static/data/payment.json";
import type { Payment } from "~/types/payment";
const paymentJson = json;

export default defineStore("payment", {
  persist: true,
  state: () => ({
    payments: paymentJson as Payment[],
  }),
  getters: {
    getProduct: (state) => state.payments,
  },
  actions: {
    addCustomer(payment: Payment): void {
      this.payments.push(payment);
    },
    removeCustomer(payment: Payment): void {
      this.payments.splice(this.payments.indexOf(payment), 1);
    },
    updateCustomer(payment: Payment): void {
      const index = this.payments.indexOf(payment);
      this.payments.splice(index, 1, payment);
    },
  },
});
