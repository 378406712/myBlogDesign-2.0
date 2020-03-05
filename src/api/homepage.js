import axios from 'axios'
import user from '../store/modules/user'

// export function getHomeTotal() {
//   return axios.post('/homepage/hometotal')
// }

// export function getHomeDetailItem() {
//   return axios.post('/homepage/detailItem')
// }

// export function getRank() {
//   return axios.post('/homepage/investmentRank')
// }

//获取用户设备信息
export function devices(username){
  return axios.get('/api/homepage/getServerInfo',{
    params:username
  })
}

export function deleteDevices(id){
  return axios.post('/api/homepage/deleteServerInfo',{_id:id})
}
export function BatchDeleteDevices(key){
  console.log(key,'99999')
  return axios.post('/api/homepage/BatchDeleteDevices',key)
}