import { createRouter, createWebHistory } from "vue-router";

import homePage from "@/views/homePage.vue";
import schdulePage from "@/views/schdulePage.vue";
import searchPage from "@/views/searchPage.vue";
import userProfilesPage from "@/views/settingPage.vue";
import { useAuthStore } from "@/stores/auth.store";
import type { Isnackbar } from "@/interfaces/snackbar.interface";
import { useSnackbarStore } from "@/stores/snackbar.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: homePage,
    },
    {
      path: "/userProfiles",
      name: "userProfiles",
      component: userProfilesPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/schdule",
      name: "schdule",
      component: schdulePage,
    },
    {
      path: "/search",
      name: "search",
      component: searchPage,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.CheckAuthStatus();

  if (to.meta.requiresAuth && authStore.UserNickname === "") {
    const snackbar: Isnackbar = {
      timeout: 2000,
      message: "請先登入",
      color: "warning",
    };
    useSnackbarStore().PushSnackbar(snackbar);
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
