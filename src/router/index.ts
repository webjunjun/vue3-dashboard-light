import { getUserTokenFuc } from '@/api/common'
import { useUserStoreHook } from '@/stores/modules/user'
import { setToken } from '@/utils/auth'
import { start, close } from '@/utils/nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { WEBSITE_TITLE } from '@/utils/settings'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 参数可选 配置base路径
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
    {
      path: '/redirect/:pathMatch(.*)*',
      name: 'BlankView',
      component: () => import('@/views/other/BlankView.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/other/NotFound.vue')
    },
    {
      path: '/',
      redirect: '/page1',
    },
    {
      path: '/page1',
      name: 'HomeView',
      component: () => import('@/views//home/HomeView.vue'),
    }
  ]
})

// 获取当前用户
const currentUser = useUserStoreHook()

router.beforeEach(async (to, from, next) => {

  useTitle(WEBSITE_TITLE)
  // 进度条开始
  start()

  if (to.name === 'NotFound' || to.name === 'BlankView') {
    next()
    return
  }

  // const sysToken = getToken()
  // if (sysToken) {
  //   currentUser.setToken(sysToken)
  // }

  if (currentUser.token) {
    next()
  } else {
    // 没有登录 调用登录接口
    try {
      const tokenRes = await getUserTokenFuc()
      setToken(tokenRes.token)
      currentUser.setToken(tokenRes.token)
      next()
    } catch {
      next({ name: 'NotFound' })
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  close()
})

export default router

