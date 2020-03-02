import axios from 'axios'
/**
 * 获取公钥
 */
export function getPublicKey() {
  return axios.get('api/getPublicKey')
}

export function register(userInfo) {
  return axios.post('api/register', userInfo)
}
