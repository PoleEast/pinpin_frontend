import { createRouter, createWebHistory } from "vue-router";

import homePage from "@/views/homePage.vue";
import schdulePage from "@/views/schdulePage.vue";
import searchPage from "@/views/searchPage.vue";
import userProfilesPage from "@/views/settingPage.vue";
import { useAuthStore } from "@/stores/auth.store";

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
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next();
        } else {
          isForcedNavigation(true);
          next({ name: "home" });
        }
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

/**
 * 檢查使用者是否已經驗證通過
 *
 * @returns {boolean} 如果使用者已經驗證通過，返回 true，否則返回 false
 */
const isAuthenticated = (): boolean => {
  const authStore = useAuthStore();
  return authStore.UserNickname !== "";
};

const isForcedNavigation = (forcedNavigation: boolean): void => {
  const authStore = useAuthStore();
  authStore.SetForcedNavigation(forcedNavigation);
};

export default router;
