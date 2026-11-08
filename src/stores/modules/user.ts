import { defineStore } from 'pinia'
import store from '@/stores'
import { reactive, toRefs } from 'vue'

interface LoginUserState {
  userInfo: null | object
  token: string
}

export const useUserStore = defineStore('user', () => {
  const loginUser = reactive<LoginUserState>({
    userInfo: null,
    // token: ''
    token: import.meta.env.VITE_APP_TOKEN
  })

  const setLoginUser = (data: null | object) => {
    loginUser.userInfo = data
  }

  const setToken = (val: string) => {
    loginUser.token = val
  }

  return {
    ...toRefs(loginUser),
    setLoginUser,
    setToken
  }
})

// 在setup外使用
export const useUserStoreHook = () => {
  return useUserStore(store)
}
