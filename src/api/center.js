import axios from 'axios'

function userPassAlter(PwdData) {
  return axios.post('/api/user/passAlter', PwdData)
}
function userRemove(User){
  return axios.post('/api/user/userRemove',User)
}

export { userPassAlter,userRemove }
