import type { Snackbar } from "@/interfaces";
import { defineStore } from "pinia";

const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    queue: [] as Snackbar[],
  }),
  actions: {
    PushSnackbar(snackbar: Snackbar) {
      this.queue.push({
        timeout: snackbar.timeout ?? 3000,
        message: snackbar.message,
        color: snackbar.color ?? "success",
      });
    },

    ShiftSnackbar() {
      this.queue.shift();
    },
  },
});

export { useSnackbarStore };
