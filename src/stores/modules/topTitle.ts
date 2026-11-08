import { defineStore } from 'pinia'
import store from '@/stores'
import { reactive, toRefs } from 'vue'

interface TopTitleState {
  title: string
}

export const useTopTitleStore = defineStore('topTitle', () => {
  const topTitle = reactive<TopTitleState>({
    title: '',
  })

  const setTitle = (data: string) => {
    topTitle.title = data
  }

  return {
    ...toRefs(topTitle),
    setTitle
  }
})

// 在setup外使用
export const useTopTitleStoreHook = () => {
  return useTopTitleStore(store)
}
