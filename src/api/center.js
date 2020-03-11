import axios from 'axios'

function userPassAlter(PwdData) {
  return axios.post('/api/user/passAlter', PwdData)
}

export { userPassAlter }
