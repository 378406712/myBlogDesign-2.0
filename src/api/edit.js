import axios from 'axios'

function PostEssay(essay) {
  return axios.post('/api/edit/post-new', essay)
}
function SetCategory(category){
  return axios.post('/api/edit/set-category',category)
}

export { PostEssay,SetCategory }
