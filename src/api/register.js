import axios from 'axios'

export function register(userInfo) {
  return axios.post('/api/user/register', userInfo)
}
