import request from '@/utils/request'

/**
 * 获取 dbapi 的 token
 */
export function getUserTokenFuc() {
  return request({
    url: `token/generate?appid=${import.meta.env.VITE_APP_APPID}&secret=${import.meta.env.VITE_APP_SECRET}`,
    method: 'get'
  })
}
