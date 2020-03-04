import axios from 'axios'

export function login(userInfo) {
  return axios.post('/api/login/login', userInfo)
}

export function userInfo(username) {
  return axios.post('/api/user/getInfo',username)
}

export function logout() {
  return axios.post('api/login/logout')
}
export function DeviceInfo(InfoData){
  return axios.post('api/login/DeviceInfo',InfoData)
}

