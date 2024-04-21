import { defineStore } from "pinia";
export default defineStore("utils", {
  persist: false,
  state: () => ({
    snackbar: false,
  }),
  getters: {
    getSnackbar: (state) => state.snackbar,
  },
  actions: {
    showSnackbar() {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 3000);
    },
  },
});
