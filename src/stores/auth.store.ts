import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state: () => ({
    userNickname: '',
    isAuthenticated: false,
  }),
  actions: {
    setUser(userNickname: string) {
      this.userNickname = userNickname
      this.isAuthenticated = !!userNickname
    },

    logout() {
      this.userNickname = ''
      this.isAuthenticated = false
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    },
  },
})

export { useAuthStore }
