import type { Isnackbar } from "@/interfaces";
import { defineStore } from "pinia";

const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    queue: [] as Isnackbar[],
  }),
  actions: {
    PushSnackbar(snackbar: Isnackbar) {
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
