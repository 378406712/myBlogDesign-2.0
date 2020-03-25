import axios from 'axios'

function sendPic(data) {
  return axios.post('/api/edit/post-new', data)
}

export { sendPic }
