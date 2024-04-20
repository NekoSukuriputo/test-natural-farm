import { defineStore } from "pinia";
import json from "@/static/data/product.json";
import type { Product } from "~/types/product";
const productJson = json;

export default defineStore("product", {
  persist: true,
  state: () => ({
    products: productJson as Product[],
  }),
  getters: {
    getProduct: (state) => state.products,
  },
  actions: {
    addCustomer(product: Product): void {
      this.products.push(product);
    },
    removeCustomer(product: Product): void {
      this.products.splice(this.products.indexOf(product), 1);
    },
    updateCustomer(product: Product): void {
      const index = this.products.indexOf(product);
      this.products.splice(index, 1, product);
    },
    decreaseStockProduct(id: number): void {
      const index = this.products.findIndex((product) => product.id === id);
      this.products[index].stock--;
    },
  },
});
