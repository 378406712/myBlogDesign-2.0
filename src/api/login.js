import axios from 'axios'

export function login(userInfo) {
  return axios.post('/api/user/login', userInfo)
}

export function userInfo(username) {
  return axios.post('/api/user/getInfo', username)
}

export function logout() {
  return axios.post('/api/user/logout')
}

//传递设备信息
export function devices(deviceInfo) {
  return axios.post('/api/user/DeviceInfo', deviceInfo)
}
