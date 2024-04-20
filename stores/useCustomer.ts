import { defineStore } from "pinia";
import type { Customer } from "~/types/customer";
import json from "@/static/data/customer.json";
const customerJson = json;

export default defineStore("customer", {
  persist: true,
  state: () => ({
    customers: customerJson as Customer[],
  }),
  getters: {
    getCustomers: (state) => state.customers,
  },
  actions: {
    addCustomer(customer: Customer): void {
      this.customers.push(customer);
    },
    removeCustomer(customer: Customer): void {
      this.customers.splice(this.customers.indexOf(customer), 1);
    },
    updateCustomer(customer: Customer): void {
      const index = this.customers.indexOf(customer);
      this.customers.splice(index, 1, customer);
    },
  },
});
