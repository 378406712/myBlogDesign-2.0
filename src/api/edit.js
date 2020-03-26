import axios from 'axios'

function PostEssay(essay) {
  return axios.post('/api/edit/post-new', essay)
}

export { PostEssay }
