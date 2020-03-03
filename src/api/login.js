import axios from 'axios'

export function login(userInfo) {
  return axios.post('/api/login/login', userInfo)
}

export function userInfo(username) {
  return axios.post('/api/user/getInfo',username)
}

export function logout() {
  return axios.post('/login/logout')
}
