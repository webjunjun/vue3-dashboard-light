import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/utils/settings'

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token: string) {
  return Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}
