import axios from 'axios'
/**
 * 获取公钥
 */
export function getPublicKey() {
  return axios.get('/api/getPublicKey')
}
