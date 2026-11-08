import axios from 'axios'
import { removeToken } from '@/utils/auth'
import router from '../router'
import { useUserStoreHook } from '@/stores/modules/user'

// 处理类型“AxiosResponse<any, any>”上不存在属性“XXX”
declare module 'axios' {
  interface AxiosInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config: AxiosRequestConfig): Promise<any>
  }
}

// 获取当前用户
const currentUser = useUserStoreHook()

// 新建一个axios实例，配置请求默认设置
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  method: 'post',
  data: {}, // 默认载荷
  // 如果服务端设置了"Access-Control-Allow-Origin": "*"，客户端请求时无需再设置withCredentials: true
  // withCredentials: true, // 跨域请求是否携带cookie
  timeout: 60000 // 请求超时设置
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (currentUser.token) {
      // config.headers.Authorization = getToken()
      config.headers.Authorization = currentUser.token
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    return config
  },
  (error) => {
    console.log(error) // debug用
    return Promise.reject(error) // 抛出错误
  }
)

// response响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 状态码200
    if (response.status === 200 || response.status === 201) {
      if (res.success || res.appId) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    }
    return Promise.reject(res)
  },
  (error) => {
    console.log(`${error.message}`) // debug
    if (error.response.status === 401) {
      // Token Invalid!
      removeToken()
      currentUser.setToken('')
      currentUser.setLoginUser(null)
      router.replace({ name: 'NotFound' })
    }
    return Promise.reject(error)
  }
)

export default service
