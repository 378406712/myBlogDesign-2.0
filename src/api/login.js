import axios from 'axios'

export function login(userInfo) {
  return axios.post('/api/login/login', userInfo)
}

export function userInfo() {
  return axios.post('/user/getInfo')
}

export function logout() {
  return axios.post('/login/logout')
}