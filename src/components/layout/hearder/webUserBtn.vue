<template>
  <v-btn class="bg-secondary text-none">
    您好，{{ nickname }}
    <v-menu activator="parent" :location="$vuetify.display.mdAndUp ? 'bottom' : 'start'">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="px-1" key="logout" value="logout">
          <v-divider class="mb-2" />
          <v-list-item-title class="text-right bg- rounded pa-">
            <v-btn class="text-body-1 font-weight-bold" variant="text" @click="logout"
              ><template v-slot:append>
                <font-awesome-icon icon="right-to-bracket" />
              </template>
              登出
            </v-btn></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { computed, nextTick, onMounted } from 'vue'

const emit = defineEmits<{ showSnackbar: [message: string, color: string]; test: [] }>()

const items = [{ title: '會員資料' }, { title: '分帳功能' }]

const nickname = computed(() => {
  return useAuthStore().userNickname
})

onMounted(async () => {
  await nextTick()
  console.log('WebUserBtn mounted')
  emit('test')
})

const logout = async () => {
  const logoutResult = await useAuthStore().logout()
  emit('showSnackbar', logoutResult.message, logoutResult.result ? 'success' : 'error')
}
</script>
