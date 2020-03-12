import axios from 'axios'

function userPassAlter(PwdData) {
  return axios.post('/api/user/passAlter', PwdData)
}
function userRemove(User) {
  return axios.post('/api/user/userRemove', User)
}
function userInfoAdd(Info) {
  return axios.post('/api/user/userInfoAdd', Info)
}

export { userPassAlter, userRemove, userInfoAdd }
